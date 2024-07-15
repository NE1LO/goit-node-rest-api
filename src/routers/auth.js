import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { requestResetEmailSchema } from "../validation/resetEmailSchema.js";
import { validateBody } from "../middleware/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";
import { resetPasswordSchema } from "../validation/resetPassSchema.js";
import {
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.js";
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

router.post(
  "/send-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

export default router;
