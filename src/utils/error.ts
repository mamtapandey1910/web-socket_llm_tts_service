import { ErrorTypes } from "../types/utilTypes/errorType";
import { WebSocket } from "ws";

export class CustomError extends Error implements ErrorTypes {
  status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}

const errorCodes: Record<string, any> = {
  INVALID_REQUEST: { code: 400, message: "Invalid request data." },
  PROCESSING_ERROR: {
    code: 500,
    message: "An error occurred while processing the request.",
  },
  UNAUTHORIZED: { code: 401, message: "Unauthorized access." },
  TTS_FAILED: { code: 502, message: "Text-to-speech service failed." },
  LLM_FAILED: { code: 503, message: "LLM service failed." },
};

export function sendError(
  ws: WebSocket,
  errorType: keyof typeof errorCodes,
  details: string = "",
): void {
  const error = errorCodes[errorType] || {
    code: 500,
    message: "Unknown error.",
  };
  const response = {
    type: "error",
    code: error.code,
    message: error.message,
    details,
  };
  ws.send(JSON.stringify(response));
}

export { errorCodes };
