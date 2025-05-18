import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes/route.js";
import { logger } from "./utils/logger.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/requests", router);
app.use((req, res) => {
  return res.status(404).send("NOT FOUND!");
});

app.use((error, req, res, next) => {
  if (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
});
