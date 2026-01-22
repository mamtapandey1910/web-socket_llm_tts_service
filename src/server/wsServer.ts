import { WebSocketServer, WebSocket } from "ws";
import { Request } from "express";
import { handleWSConnection } from "./connection";

export const sockerServer = (appServer: any) => {
  const wss = new WebSocketServer({ server: appServer });

  wss.on("connection", handleWSConnection);
};
