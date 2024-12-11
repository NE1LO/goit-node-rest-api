import express from "express";
import cors from "cors";
import pino from "pino-http";
import router from "./routers/index.js";
import cookieParser from "cookie-parser";

import { notFoundHandler } from "./utils/notFoundHandler.js";
import { errorHandler } from "./utils/errorHandler.js";

import { UPLOAD_DIR } from "./constants/index.js";

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ["application/json", "application/vnd.api+json"],
    })
  );
  app.use(cors());
  // app.use(pino({
  //   transport:
  //     {target: 'pino-pretty',
  //     },

  // }));

  app.use(cookieParser());
  app.use(router);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use("/uploads", express.static(UPLOAD_DIR));
};
