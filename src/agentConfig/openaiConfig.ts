import Openai, { OpenAI } from "openai";
import { catchSocketAsynchAsynchError } from "../utils/catchAsyncError";
import { sendError } from "../utils/error";

export const openAiClient = (): OpenAI | void => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.info("apiKey has been missing");
    return;
  }

  const client = new OpenAI({ apiKey });
  return client;
};
