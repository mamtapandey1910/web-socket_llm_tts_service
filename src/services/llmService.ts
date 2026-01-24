import { openAiClient } from "../agentConfig/openaiConfig";
import EventEmitter from "events";

export const generateLLMTextUsingStream = async (promptText: string) => {
  const emitter = new EventEmitter();

  try {
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
  } catch (err: any) {
    if (err.code === "UND_ERR_SOCKET") {
      console.log(
        "UND_ERR_SOCKET Error Occured while fetching LLM text, try again",
      );
    }
    console.log(" Error Occured with fetching the text, try again");
  }
  return emitter;
};
