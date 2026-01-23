// import { getTextToSpeech } from "../services/ttsService";

import { getTextToSpeech } from "../services/ttsService";

// This is a customise queue where receiving the buffered segments from LLM and CAll TEXT to Speech API and send it to client once the message is in the queue
export class TTSQueue {
  private queue: string[] = [];
  private processing = false;
  private onAudio: (audio: Buffer) => void;

  constructor(onAudio: (audio: Buffer) => void) {
    this.onAudio = onAudio;
  }

  // process the message and send it to the client
  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const text = this.queue.shift();
      if (!text) continue;

      const audio = await getTextToSpeech(text);
      this.onAudio(audio);
    }

    this.processing = false;
  }
  // enqueue the message
  enqueue(text: string) {
    this.queue.push(text);
    this.process();
  }
}
