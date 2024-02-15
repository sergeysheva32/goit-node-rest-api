import express from "express";

import {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  getCurrent,
  changeSubType,
} from "../controllers/authController.js";
import { validateBody } from "../helpers/index.js";
import {
  loginSchema,
  registerSchema,
  updateSubSchema,
} from "../schemas/usersSchemas.js";
import { authenticate } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerCtrl);

authRouter.post("/login", validateBody(loginSchema), loginCtrl);

authRouter.post("/logout", authenticate, logoutCtrl);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubSchema),
  changeSubType
);