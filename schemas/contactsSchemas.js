import Joi from "joi";

export const createContactSchema = Joi.object({
name: Joi.string().min(2).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(6).required(),
})

export const updateContactSchema = Joi.object({
name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})