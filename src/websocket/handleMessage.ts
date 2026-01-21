import { WebSocket } from "ws";
import { getLLMTextResponse } from "../services/llmservices";

export const handleMessage = async (socket: WebSocket, rawData: string) => {
  try {
    const data = JSON.parse(rawData);

    await getLLMTextResponse(data);
    console.log(data);
  } catch (err) {
    console.log(err);
    socket.send(JSON.stringify({ message: "invalid JSON" }));
  }
};
