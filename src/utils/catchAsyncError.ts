import { CustomError } from "./error";

export const catchSocketAsynchAsynchError = (
  func: (...args: any[]) => Promise<any>,
) => {
  return async (...args: any) => {
    try {
      await func(...args);
    } catch (error: any) {
      console.error("Error: ", error.message);
      throw new CustomError("Error: ", error.message);
    }
  };
};
