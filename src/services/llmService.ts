import { openAiClient } from "../agentConfig/openaiConfig";
import { splitTextIntoSegment } from "../util/segmentText";

import { getTextToSpeech } from "./ttsService";
import { EventEmitter } from "stream";

export const getLLMTextResponse = async (promtpText: any) => {
  // console.log("promtpText", promtpText);
  const response = await openAiClient.responses.create({
    model: "gpt-5-nano",
    input: promtpText.message,
  });

  const textSegment = splitTextIntoSegment(response.output_text, 500);

  // console.log(response.output_text);
  const textArray: any = textSegment?.map((text) => getTextToSpeech(text));
  const allAudioSegments = await Promise.all(textArray);

  // return await getTextToSpeech(response.output_text);
  console.log("allAudioSegments", allAudioSegments);
};
