import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Hello world" });
});

export default app;
