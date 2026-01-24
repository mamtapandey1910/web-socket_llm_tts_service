import { openAiClient } from "../agentConfig/openaiConfig";
import EventEmitter from "events";

export const generateLLMTextUsingStream = async (promptText: string) => {
  const emitter = new EventEmitter();

  const response = await openAiClient.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: promptText }],
    stream: true,
  });

  (async () => {
    try {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) emitter.emit("text", content);
      }
      emitter.emit("end");
    } catch (err) {
      emitter.emit("error", err);
    }
  })();

  return emitter;
};
