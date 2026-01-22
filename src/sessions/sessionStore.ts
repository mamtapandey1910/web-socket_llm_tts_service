import { randomUUID } from "crypto";

const sessionData = new Map();

export const createSession = (ws: any) => {
  const session = {
    id: randomUUID,
    ws,
    history: [],
    busy: false,
  };

  sessionData.set(session.id, session);
  return session;
};

const destroySession = (sessionId: any) => {
  sessionData.delete(sessionId);
};
