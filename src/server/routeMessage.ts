import { WebSocket, RawData } from "ws";
import { sendMessage } from "../utils/sendMessage";
// import { streamLLMToTTS } from "../services/llmService";
import { catchAsynchError } from "../utils/catchAsyncError";
import { streamLLMToTTS } from "../orchestrateServices/streamLLMtoTTS";

export const handleMessage = async (session: any, rawData: any) => {
  try {
    const data = JSON.parse(rawData);
    const msg = await streamLLMToTTS(data.message, session);
  } catch (err) {
    console.log(err);
    sendMessage(session.ws, JSON.stringify({ message: "invalid JSON" }));
  }
};
