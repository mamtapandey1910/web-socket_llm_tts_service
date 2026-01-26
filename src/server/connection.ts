import { WebSocket, RawData } from "ws";
import { Request } from "express";
import { handleMessage } from "./routeMessage";
import { createSession } from "../sessions/sessionStore";
import { sendMessage } from "../utils/sendMessage";
import { catchSocketAsyncError } from "../utils/catchAsyncError";
import { handleWSConnectionType } from "../types/serverTypes/connectionTypes";

export const handleWSConnection: handleWSConnectionType = catchSocketAsyncError(
  async (socket: WebSocket, req: Request) => {
    if (!socket) {
      return;
    }
    const session = createSession(socket);

    socket.on("message", async (data: RawData): Promise<void> => {
      if (!data) {
        sendMessage(socket, {
          type: "error",
          message: "Empty message received",
        });
      }
      sendMessage(socket, JSON.stringify({ message: "Thinking..." }));
      handleMessage(socket, data);
    });

    socket.on("close", () => {
      console.log("Connection closed");
      sendMessage(socket, "Connection Closed");
    });

    socket.on("error", () => {
      console.log("Socket error has been occured");
      sendMessage(socket, "Socket error has been occured");
    });
  },
);
