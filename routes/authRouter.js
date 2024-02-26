import express from "express";

import {
  registerCtrl,
  verifyEmailCtrl,
  resendVerifyEmailCtrl,
  loginCtrl,
  logoutCtrl,
  getCurrent,
  changeSubType,
  updateAvatarCtrl,
} from "../controllers/authController.js";
import { validateBody } from "../helpers/index.js";
import {
  loginSchema,
  registerSchema,
  updateSubSchema,
  emailSchema,
} from "../schemas/usersSchemas.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerCtrl);

authRouter.get("/verify/:verificationToken", verifyEmailCtrl);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmailCtrl);

authRouter.post("/login", validateBody(loginSchema), loginCtrl);

authRouter.post("/logout", authenticate, logoutCtrl);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubSchema),
  changeSubType
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarCtrl
);