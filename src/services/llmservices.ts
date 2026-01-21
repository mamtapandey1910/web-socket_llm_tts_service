import { openAiClient } from "../openai/openaiConfig";

export const getLLMTextResponse = async (promtpText: any) => {
  console.log("promtpText", promtpText);
  const response = await openAiClient.responses.create({
    model: "gpt-5-nano",
    input: promtpText.message,
  });

  console.log(response.output_text);
};
