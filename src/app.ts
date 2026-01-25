import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { CustomError } from "./utils/error";

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Hello world" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.status || 500;
  if (err.message.includes("duplicate")) {
    statusCode = 409;
  }

  res.status(statusCode).json({ success: false, message });
});

export default app;
