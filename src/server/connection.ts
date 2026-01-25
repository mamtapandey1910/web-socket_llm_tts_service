import { WebSocket, RawData } from "ws";
import { Request } from "express";
import { handleMessage } from "./routeMessage";
import { createSession } from "../sessions/sessionStore";
import { sendMessage } from "../utils/sendMessage";
import { catchSocketAsynchAsynchError } from "../utils/catchAsyncError";

export const handleWSConnection = catchSocketAsynchAsynchError(
  async (socket: any, req: Request) => {
    if (!socket) {
      return;
    }
    const session = createSession(socket);

    socket.on("message", (data: RawData): void => {
      if (!data) {
        sendMessage(socket, {
          type: "error",
          message: "Empty message received",
        });
      }
      sendMessage(socket, JSON.stringify({ message: "Thinking..." }));
      handleMessage(session, data);
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
