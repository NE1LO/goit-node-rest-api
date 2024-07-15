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
//#################################################__REGISTER__
router.post(
  "/register",
  validateBody(registerUserSchema),
  registerUserController
);
//#################################################__LOGIN__
router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);
//#################################################__LOGOUT__
router.post("/logout", ctrlWrapper(logoutUserController));

//#################################################__REFRESH__
router.post("/refresh", ctrlWrapper(refreshUserSessionController));

//#################################################__SEND__TO__EMAIL__
router.post(
  "/send-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);
//#################################################__RESED__PWD__
router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

export default router;
