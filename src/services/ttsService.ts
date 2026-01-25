import { openAiClient } from "../agentConfig/openaiConfig";
import fs from "fs";
import { CustomError } from "../utils/error";
import { WebSocket } from "http";

export const getTextToSpeech = async (
  socket: WebSocket,
  text: string,
): Promise<any> => {
  const openAi = openAiClient();
  if (!openAi) {
    throw new CustomError("Error has been occured in getTextToSpeech");
  }

  const speech = await openAi.audio.speech.create({
    input: text,
    model: "gpt-4o-mini-tts",
    voice: "nova",
  });

  const speechBuffer = Buffer.from(await speech.arrayBuffer());
  return speechBuffer;
};
