import { WebSocket, RawData } from "ws";
import { sendMessage } from "../utils/sendMessage";
import { catchSocketAsyncError } from "../utils/catchAsyncError";
import { streamLLMToTTS } from "../orchestrateServices/streamLLMtoTTS";
import { SessionType } from "../types/sessionType/sessionStoreType";
import { handleMessageType } from "../types/serverTypes/routeMessageType";

export const handleMessage: handleMessageType = catchSocketAsyncError(
  async (socket: WebSocket, rawData: any) => {
    const data = JSON.parse(rawData);
    await streamLLMToTTS(socket, data.message);
  },
);
