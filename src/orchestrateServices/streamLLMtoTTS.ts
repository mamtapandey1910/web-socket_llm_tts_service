import { WebSocket } from "ws";
import { TTSQueue } from "../utils/queue";
import { splitTextIntoSegment } from "../utils/segmentText";
import { generateLLMTextUsingStream } from "../services/llmService";
import { catchSocketAsyncError } from "../utils/catchAsyncError";
import { CustomError } from "../utils/error";
import { StreamLLMToTTSType } from "../types/orchestrateServicesType/streamLLMtoTTSType";

export const streamLLMToTTS: StreamLLMToTTSType = catchSocketAsyncError(
  async (socket: WebSocket, promptText: string) => {
    const llmStream = await generateLLMTextUsingStream(socket, promptText);

    if (!socket || !llmStream) {
      throw new CustomError("session or llmStream missing");
    }

    let textBuffer = "";

    // Instantiate queue
    const ttsQueue = new TTSQueue(
      socket,
      (audio: Buffer) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(audio);
        }
      },
      () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "TTS_END" }));
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

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "ERROR",
            message: "LLM generation failed",
          }),
        );
        socket.close();
      }
    });
  },
);
