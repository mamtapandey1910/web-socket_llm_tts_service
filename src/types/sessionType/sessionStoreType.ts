import { WebSocket } from "ws";

export interface SessionType {
  id: string;
  ws: WebSocket;
  history: string[];
  busy: boolean;
}

export type createSessionType = (ws: WebSocket) => SessionType;
