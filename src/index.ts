import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: "./config/config.env" });

app.listen(process.env.PORT, (err: Error | undefined) => {
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
