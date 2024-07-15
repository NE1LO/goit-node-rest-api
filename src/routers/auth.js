import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema } from "../validation/auth.js";
import { validateBody } from "../middleware/validateBody.js";
import { loginUserSchema } from "../validation/auth.js";
import {
  logoutUserController,
  loginUserController,
  registerUserController,
} from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  registerUserController
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

export default router;
