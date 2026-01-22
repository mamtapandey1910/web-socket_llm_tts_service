import Openai from "openai";

export const openAiClient = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});
