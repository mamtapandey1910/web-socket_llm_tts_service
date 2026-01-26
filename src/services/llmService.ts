import { openAiClient } from "../agentConfig/openaiConfig";
import EventEmitter from "events";
import { CustomError } from "../utils/error";
import { catchSocketAsyncError } from "../utils/catchAsyncError";

export const generateLLMTextUsingStream = catchSocketAsyncError(
  async (socket, promptText: string) => {
    const emitter = new EventEmitter();
    if (!emitter) {
      throw new CustomError(
        "Error occured in generateLLMTextUsingStream: emitter is possibly",
        emitter,
      );
    }

    const openAi = openAiClient();
    if (!openAi) {
      throw new CustomError(
        "Error has been occured in generateLLMTextUsingStream",
      );
    }

    try {
      const response = await openAi.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: promptText }],
        stream: true,
      });

      (async () => {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              emitter.emit("text", content);
            }
          }
          emitter.emit("end");
        } catch (err) {
          emitter.emit("error", err);
        }
      })();
    } catch (err: any) {
      if (err.type === "UND_ERR_SOCKET") {
        console.log(
          "UND_ERR_SOCKET Error Occured while fetching LLM text, try again",
        );
      }
      console.log(" Error Occured with fetching the text, try again");
    }
    return emitter;
  },
);
