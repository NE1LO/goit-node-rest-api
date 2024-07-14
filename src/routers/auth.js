import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// ========================================================IMPORT FOR VALIDATION
import { validateBody } from "../middleware/validateBody.js";
import { registerSchema, loginSchema } from "../validation/authValidate.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  register,
  refreshSession,
  login,
  logout,
} from "../controllers/auth.js";

const authRouter = Router();

//#=================================================> Registration
authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);
authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));
authRouter.post("/refresh", authenticate, ctrlWrapper(refreshSession));
authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;
