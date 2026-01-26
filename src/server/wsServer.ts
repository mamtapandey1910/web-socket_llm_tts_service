import { WebSocketServer, WebSocket } from "ws";
import { Request } from "express";
import { handleWSConnection } from "./connection";
import { CustomError, sendError } from "../utils/error";
import { Server as HttpServer } from "http";

let wss: WebSocketServer;

export const sockerServer = (appServer: any) => {
  try {
    wss = new WebSocketServer({ server: appServer });

    wss.on("connection", handleWSConnection);

    wss.on("error", (err) => {
      new CustomError("Error occured in Websocket connection");
    });

    return wss;
  } catch (err: unknown) {
    console.log("something went wrong globally", err);
  }
};

export const closeWebSocketServer = () => {
  if (!wss) return;

  console.log("Closing WebSocket connections...");

  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.close(1001, "Server shutting down");
    }
  });

  wss.close(() => {
    console.log("WebSocket server closed");
  });
};
