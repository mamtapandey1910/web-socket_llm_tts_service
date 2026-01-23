import { openAiClient } from "../agentConfig/openaiConfig";
import fs from "fs";

export const getTextToSpeech = async (text: string): Promise<any> => {
  // console.log("texttt", text);
  const speech = await openAiClient.audio.speech.create({
    input: text,
    model: "gpt-4o-mini-tts",
    voice: "nova",
  });

  const speechBuffer = Buffer.from(await speech.arrayBuffer());
  // console.log("speechBuffer", speechBuffer);
  return speechBuffer;
};
