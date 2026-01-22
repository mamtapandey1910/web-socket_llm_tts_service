import WebSocket from "ws";

export const sendMessage = (ws: WebSocket, data: any) => {
  if (ws.readyState !== ws.OPEN || ws.bufferedAmount > 1000000) {
    return;
  }

  ws.send(data, { binary: true });
};
