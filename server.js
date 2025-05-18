process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

import { app } from "./src/app.js";
import { config } from "dotenv";
import { logger } from "./src/utils/logger.js";
config();

const bootstrap = () => {
  try {
    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

bootstrap();
