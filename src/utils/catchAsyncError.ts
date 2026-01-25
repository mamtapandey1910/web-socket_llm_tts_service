import { WebSocket } from "ws";
import { CustomError } from "./error";
import { sendError, errorCodes } from "./error";

export const catchSocketAsynchAsynchError = (
  func: (...args: any[]) => Promise<any>,
) => {
  return async (...args: any[]): Promise<any> => {
    const ws = args[0] as WebSocket | undefined;
    try {
      return await func(...args);
    } catch (error: unknown) {
      console.error("Socket async error:", error);

      if (ws && ws.readyState === ws.OPEN && error instanceof Error) {
        sendError(ws, errorCodes[error.name], errorCodes[error.name]?.code);
        new CustomError(`SOCKET_ERROR: ${error.message}`);
      } else if (error instanceof Error) {
        console.log("Error occurred, cannot send to socket:", error.message);
      }
    }
  };
};
