import { CustomError } from "./error";

const catchAsynchError = (func: (...args: any[]) => Promise<any>) => {
  return async (...args: any) => {
    try {
      await func(...args);
    } catch (error: any) {
      throw new CustomError(error.message);
    }
  };
};
