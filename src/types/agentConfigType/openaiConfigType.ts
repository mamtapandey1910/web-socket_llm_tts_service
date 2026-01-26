import { OpenAI } from "openai";

export type openAiClientType = () => OpenAI | void;
