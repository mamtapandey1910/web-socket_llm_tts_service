import { ErrorTypes } from "../types/utilTypes/errorType";

class CustomError extends Error implements ErrorTypes {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
