import { WebSocket } from "ws";
import { sendMessage } from "../util/sendMessage";
import {
  // chatCompletionInStream,
  getLLMTextResponse,
  // createLLMTextStream,
} from "../services/llmService";

export const handleMessage = async (session: any, rawData: any) => {
  try {
    const data = JSON.parse(rawData);

    const text = await getLLMTextResponse(data);
    sendMessage(session.ws, text);
  } catch (err) {
    console.log(err);
    sendMessage(session.ws, JSON.stringify({ message: "invalid JSON" }));
  }
};
