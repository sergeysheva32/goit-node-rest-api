import Joi from "joi";
import { subsList } from "../helpers/index.js";

export const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subsList),
});

export const emailSchema = Joi.object({
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const updateSubSchema = Joi.object({
  subscription: Joi.string().valid(...subsList),
});