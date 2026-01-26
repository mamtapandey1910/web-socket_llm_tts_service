import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import http from "http";
import app from "./app";
import { sockerServer } from "./server/wsServer";
import { closeWebSocketServer } from "./server/wsServer";

export const server = http.createServer(app);
const wss = sockerServer(server);

server.listen(process.env.PORT, (err: Error | void) => {
  if (err) {
    console.log("Server failed to start at", process.env.PORT, err);
    process.exit(1);
  }
  console.log("server is listening on port ", process.env.PORT);
});

// Shutdown connection and provide reason. in consolelog
const shutdown = (reason: string, err?: unknown) => {
  console.log(`Shutting down due to ${reason}`);
  if (err) console.error(err);

  server.close(() => {
    console.log("HTTP server closed");
  });
  closeWebSocketServer();
  process.exit(0);
};

// when we stop using ctrl+c then it shoyld close connection
process.on("SIGINT", () => shutdown("SIGINT"));
// when operation system stop it should close the connection
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", (err) => shutdown("uncaughtException", err)); // self explonatory
process.on("unhandledRejection", (err) => shutdown("unhandledRejection", err)); // self explanotry
