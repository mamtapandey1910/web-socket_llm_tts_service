import { WebSocket, RawData } from "ws";
import { sendMessage } from "../utils/sendMessage";
// import { streamLLMToTTS } from "../services/llmService";
import { catchSocketAsynchAsynchError } from "../utils/catchAsyncError";
import { streamLLMToTTS } from "../orchestrateServices/streamLLMtoTTS";

export const handleMessage = catchSocketAsynchAsynchError(
  async (session: any, rawData: any) => {
    const data = JSON.parse(rawData);
    await streamLLMToTTS(data.message, session);
  },
);
