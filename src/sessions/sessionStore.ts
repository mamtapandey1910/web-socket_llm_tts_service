import { randomUUID, RandomUUIDOptions } from "crypto";
import {
  createSessionType,
  SessionType,
} from "../types/sessionType/sessionStoreType";
import WebSocket from "ws";

const sessionData = new Map();

export const createSession: createSessionType = (
  ws: WebSocket,
): SessionType => {
  const session: SessionType = {
    id: randomUUID(),
    ws,
    history: [],
    busy: false,
  };

  sessionData.set(session.id, session);
  return session;
};

const destroySession = (sessionId: any): void => {
  sessionData.delete(sessionId);
};
