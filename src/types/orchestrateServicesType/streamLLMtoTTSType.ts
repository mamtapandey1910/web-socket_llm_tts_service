import { WebSocket } from "ws";

export type StreamLLMToTTSType = (
  socket: WebSocket,
  prompt: string,
) => Promise<void>;
