import { WebSocketServer, WebSocket } from "ws";
import { Request } from "express";
import { handleMessage } from "./handleMessage";

export const sockerServer = (appServer: any) => {
  const wss = new WebSocketServer({ server: appServer });

  wss.on("connection", (socket: WebSocket, req: Request) => {
    console.log(req.body?.user);

    socket.on("message", (data) => {
      //   console.log("data", data.toString());
      handleMessage(socket, data.toString());
      socket.send("message received");
    });
  });
};
