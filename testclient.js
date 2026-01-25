const webSocket = require("ws");

const wss = new webSocket("ws://localhost:8000");

wss.on("open", () => {
  console.log("Connected");
});

wss.on("message", (data) => {
  console.log("data", data.toString());
});

wss.on("close", () => {
  console.log("Connection Closed");
});

setTimeout(() => {
  wss.send(JSON.stringify({ message: "Tell me a short story" }));
}, 2000);
