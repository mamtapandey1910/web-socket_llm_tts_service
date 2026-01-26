import { getTextToSpeech } from "../services/ttsService";
import { WebSocket } from "ws";

// This is a customise queue where receiving the buffered segments from LLM and CAll TEXT to Speech API
export class TTSQueue {
  private queue: string[] = [];
  private processing = false;
  private closed = false;

  constructor(
    private socket: WebSocket,
    private onAudio: (audio: Buffer) => void,
    private onEnd: () => void,
  ) {}

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
    this.checkDone();
  }

  private checkDone() {
    if (this.closed && !this.processing && this.queue.length === 0) {
      this.onEnd();
    }
  }

  enqueue(text: string) {
    this.queue.push(text);
    this.process();
  }

  close() {
    this.closed = true;
    this.checkDone();
  }
}
