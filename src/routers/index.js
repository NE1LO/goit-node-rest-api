import { Router } from "express";
import contactsRouter from "./contacts.js";
import authRouter from "./auth.js";
// ########################################
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json" assert { type: "json" };
//#########################################

const router = Router();

router.use("", contactsRouter);
router.use("/auth", authRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
