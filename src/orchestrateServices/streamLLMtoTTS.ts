import { TTSQueue } from "../utils/queue";
import { splitTextIntoSegment } from "../utils/segmentText";
import { generateLLMTextUsingStream } from "../services/llmService";
import { catchSocketAsynchAsynchError } from "../utils/catchAsyncError";
import { CustomError } from "../utils/error";

// This function is to get the LLM generated data, make it a buffer string of minimum size 150 and call Text to Speech API to convert it to audio.
export const streamLLMToTTS = catchSocketAsynchAsynchError(
  async (promptText: string, session: any) => {
    // It will return event emitter hence listening to it's event to access chunks
    const llmStream = await generateLLMTextUsingStream(promptText);

    if (!session.ws || !llmStream) {
      throw new CustomError(
        "streamLLMToTTS : session.ws or  llmStream is possibly undefined",
      );
    }

    // text approx 150 text long to send it to TTSqueue
    let textBuffer = "";

    const ttsQueue = new TTSQueue((audio) => {
      if (session.ws.readyState === session.ws.OPEN) {
        session.ws.send(audio, { binary: true });
      }
    });

    llmStream.on("text", (chunk: string) => {
      textBuffer += chunk;

      const lastChar = textBuffer[textBuffer.length - 1];
      const endsSentence =
        lastChar === "." || lastChar === "!" || lastChar === "?";

      // check if sentence has ended either before 150 char length or before 150 charlength
      const splitAndSendToQueue =
        textBuffer.length >= Number(process.env.SEGMENT_SIZE || 150) ||
        endsSentence;

      if (splitAndSendToQueue) {
        const segments = splitTextIntoSegment(textBuffer);
        segments.forEach((seg) => ttsQueue.enqueue(seg));
        textBuffer = "";
      }
    });

    llmStream.on("end", () => {
      if (textBuffer.trim()) {
        const segments = splitTextIntoSegment(textBuffer);
        segments.forEach((seg) => ttsQueue.enqueue(seg));
      }
    });

    llmStream.on("error", (err: Error) => {
      console.error("LLM error:", err);
      if (session.ws.readyState === session.ws.OPEN) {
        session.ws.close();
      }
    });
  },
);
