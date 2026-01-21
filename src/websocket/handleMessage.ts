import { WebSocket } from "ws";

export const handleMessage = (socket: WebSocket, rawData: string) => {
  try {
    const data = JSON.parse(rawData);
    console.log(data);
  } catch (err) {
    console.log(err);
    socket.send(JSON.stringify({ message: "invalid JSON" }));
  }
};
