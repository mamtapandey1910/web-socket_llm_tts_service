import { WebSocket } from "ws";
import { Request } from "express";
import { handleMessage } from "./routeMessage";
import { createSession } from "../sessions/sessionStore";
import { sendMessage } from "../utils/sendMessage";

export const handleWSConnection = (socket: WebSocket, req: Request) => {
  console.log(req.body?.user);

  const session = createSession(socket);

  socket.on("message", (data): void => {
    socket.send("Thinking......");
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
};
