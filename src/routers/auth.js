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

const routerAuth = Router();

//#=================================================> Registration
routerAuth.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);
routerAuth.post("auth/login", validateBody(loginSchema), ctrlWrapper(login));
routerAuth.post("auth/refresh", authenticate, ctrlWrapper(refreshSession));
routerAuth.post("auth/logout", authenticate, ctrlWrapper(logout));

export default routerAuth;
