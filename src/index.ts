import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import http from "http";
import app from "./app";

import { sockerServer } from "./websocket/websockerServer";

const server = http.createServer(app);
sockerServer(server);

server.listen(process.env.PORT, (err: Error | void) => {
  if (err) {
    console.log("Server failed to start at", process.env.PORT, err);
    process.exit(1);
  }
  console.log("server is listening on port ", process.env.PORT);
});

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught exception", err);
  process.exit(1);
});
