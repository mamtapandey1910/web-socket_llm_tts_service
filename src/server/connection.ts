import { WebSocket } from "ws";
import { Request } from "express";
import { handleMessage } from "./routeMessage";
import { createSession } from "../sessions/sessionStore";

export const handleWSConnection = (socket: WebSocket, req: Request) => {
  console.log(req.body?.user);

  const session = createSession(socket);

  socket.on("message", (data) => handleMessage(session, data));

  socket.on("close", () => {
    console.log("Connection closed");
  });
};
