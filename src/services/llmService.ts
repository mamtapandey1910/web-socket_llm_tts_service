import { openAiClient } from "../agentConfig/openaiConfig";

import { SessionType } from "../types/sessionType/sessionStoreType";
import { catchAsynchError } from "../utils/catchAsyncError";
import EventEmitter from "events";
import { inputDataType } from "../types/llmServiceType/llmServiceType";

export const getllmResponseStream = catchAsynchError(
  async (data: inputDataType, session: SessionType): Promise<any> => {
    const eventEmitter = new EventEmitter();

    const streams = openAiClient.responses.stream({
      model: "gpt-4.1",
      input: data.message,
    });

    try {
      for await (const segment of streams) {
        if (segment && segment.type === "response.output_text.delta") {
          console.log("segment", segment);
          eventEmitter.emit("segment", { messageId: data.id, segment });
        }
      }
      eventEmitter.emit("end");
    } catch (err) {
      eventEmitter.emit("error", err);
    }
    return eventEmitter;
  },
);
