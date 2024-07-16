import createHttpError from "http-errors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json" assert { type: "json" };
import fs from "node:fs";

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerDocument).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
