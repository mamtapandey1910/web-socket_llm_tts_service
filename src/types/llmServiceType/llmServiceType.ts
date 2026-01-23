import { EventEmitter } from "events";
import { SessionType } from "../sessionType/sessionStoreType";

export interface inputDataType {
  id: "string";
  message: string;
}

export type getllmResponseStreamType = (
  data: inputDataType,
  session: SessionType,
) => EventEmitter;
