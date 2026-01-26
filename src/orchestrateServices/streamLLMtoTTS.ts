import { WebSocket } from "ws";
import { TTSQueue } from "../utils/queue";
import { splitTextIntoSegment } from "../utils/segmentText";
import { generateLLMTextUsingStream } from "../services/llmService";
import { catchSocketAsyncError } from "../utils/catchAsyncError";
import { CustomError } from "../utils/error";
import { StreamLLMToTTSType } from "../types/orchestrateServicesType/streamLLMtoTTSType";

export const streamLLMToTTS: StreamLLMToTTSType = catchSocketAsyncError(
  async (session: WebSocket, promptText: string) => {
    const llmStream = await generateLLMTextUsingStream(session, promptText);

    if (!session || !llmStream) {
      throw new CustomError("session or llmStream missing");
    }

    let textBuffer = "";

    const ttsQueue = new TTSQueue(
      session,
      (audio: Buffer) => {
        if (session.readyState === WebSocket.OPEN) {
          session.send(audio);
        }
      },
      () => {
        if (session.readyState === WebSocket.OPEN) {
          session.send(JSON.stringify({ type: "TTS_END" }));
        }
      },
    );

    llmStream.on("text", (chunk: string) => {
      textBuffer += chunk;

      const lastChar = textBuffer[textBuffer.length - 1];
      const endsSentence =
        lastChar === "." || lastChar === "!" || lastChar === "?";

      const shouldSplit =
        textBuffer.length >= Number(process.env.SEGMENT_SIZE || 150) ||
        endsSentence;

      if (shouldSplit) {
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
      ttsQueue.close();
    });

    llmStream.on("error", (err: Error) => {
      console.error("LLM stream error", err);

      if (session.readyState === WebSocket.OPEN) {
        session.send(
          JSON.stringify({
            type: "ERROR",
            message: "LLM generation failed",
          }),
        );
        session.close();
      }
    });
  },
);
