import { WebSocketServer, WebSocket } from "ws";
import { Request } from "express";
import { handleWSConnection } from "./connection";
import { sendError } from "../utils/error";

export const sockerServer = (appServer: any) => {
  try {
    const wss: WebSocketServer = new WebSocketServer({ server: appServer });

    wss.on("connection", handleWSConnection);

    wss.on("error", (err) => {
      console.log("Error occured in Websocket connection");
    });
  } catch (err: unknown) {
    console.log("something went wrong globally", err);
  }
};
