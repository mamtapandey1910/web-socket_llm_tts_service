import { openAiClient } from "../agentConfig/openaiConfig";
import fs from "fs";

export const getTextToSpeech = async (text: string): Promise<any> => {
  const speech = await openAiClient.audio.speech.create({
    input: text,
    model: "gpt-4o-mini-tts",
    voice: "nova",
  });

  const speechBuffer = Buffer.from(await speech.arrayBuffer());
  return speechBuffer;
};
