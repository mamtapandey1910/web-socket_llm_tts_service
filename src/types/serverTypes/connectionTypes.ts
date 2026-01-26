import { WebSocket } from "ws";
import { Request } from "express";

export type handleWSConnectionType = (
  ws: WebSocket,
  req: Request,
) => Promise<void>;
