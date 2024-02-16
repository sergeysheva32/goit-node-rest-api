import express from "express";

import {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  getCurrent,
} from "../controllers/authController.js";
import { validateBody } from "../helpers/index.js";
import { loginSchema, registerSchema } from "../schemas/usersSchemas.js";
import { authenticate } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerCtrl);

authRouter.post("/login", validateBody(loginSchema), loginCtrl);

authRouter.post("/logout", authenticate, logoutCtrl);

authRouter.get("/current", authenticate, getCurrent);