const webSocket = require("ws");

const wss = new webSocket("ws://localhost:8000");

wss.on("open", () => {
  console.log("Connected");
  //   wss.send("hello backend");
});

wss.on("message", (data) => {
  console.log("data", data.toString());
});

setInterval(() => {
  wss.send(JSON.stringify({ message: "hello backend" }));
}, 5000);
