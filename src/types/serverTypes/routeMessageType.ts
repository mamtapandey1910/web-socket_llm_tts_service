import { WebSocket } from "ws";

export type handleMessageType = (ws: WebSocket, rawData: any) => Promise<void>;
