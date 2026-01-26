import Openai, { OpenAI } from "openai";
import { catchSocketAsyncError } from "../utils/catchAsyncError";
import { sendError } from "../utils/error";
import { openAiClientType } from "../types/agentConfigType/openaiConfigType";

export const openAiClient: openAiClientType = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.info("apiKey has been missing");
    return;
  }

  const client = new OpenAI({ apiKey });
  return client;
};
