import { getTextToSpeech } from "../services/ttsService";
import { WebSocket } from "ws";

// This is a customise queue where receiving the buffered segments from LLM and CAll TEXT to Speech API and send it to client once the message is in the queue
export class TTSQueue {
  private queue: string[] = [];
  private processing = false;
  private onAudio: (audio: Buffer) => void;
  private socket: WebSocket;

  constructor(socket: WebSocket, onAudio: (audio: Buffer) => void) {
    this.onAudio = onAudio;
    this.socket = socket;
  }

  // process the message and send it to the client
  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const text = this.queue.shift();
      if (!text) continue;

      const audio = await getTextToSpeech(this.socket, text);
      this.onAudio(audio);
    }

    this.processing = false;
  }
  // send message to the queue
  enqueue(text: string) {
    this.queue.push(text);
    this.process();
  }
}
