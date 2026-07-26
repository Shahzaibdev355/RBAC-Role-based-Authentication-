import Joi from "joi";

export const registerSchema = Joi.object({
    userName: Joi.string().min(2).max(50).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).required(),
    role: Joi.string().min(2).max(15).required().trim(),
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  });