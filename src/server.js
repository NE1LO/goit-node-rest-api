import express from "express";
import cors from "cors";
import pino from "pino-http";
import router from "./routers/index.js";
import routerAuth from "./routers/auth.js";
import cookieParser from "cookie-parser";

import { notFoundHandler } from "./utils/notFoundHandler.js";
import { errorHandler } from "./utils/errorHandler.js";

const PORT = process.env.PORT || 3000;

const setupServer = () => {
  const app = express();
  app.use(
    express.json({ type: ["application/json", "application/vnd.api+json"] })
  );
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: { target: "pino-pretty" },
    })
  );

  app.use(router);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
