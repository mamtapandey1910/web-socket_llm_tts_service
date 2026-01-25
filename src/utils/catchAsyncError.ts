import { WebSocket } from "ws";
import { CustomError } from "./error";
import { sendError, errorCodes } from "./error";

export const catchSocketAsynchAsynchError = (
  func: (...args: any[]) => Promise<any>,
  ws?: WebSocket,
  errorType?: any,
) => {
  return async (...args: any) => {
    try {
      await func(...args);
    } catch (error: unknown) {
      if (ws && ws?.readyState === ws?.OPEN && error instanceof Error) {
        sendError(ws, errorType, error.message);
      } else {
        if (error instanceof Error) {
          throw new CustomError(error.message, 500);
        }
      }
    }
  };
};
