import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required(),
  phone: Joi.number().required().min(5).max(16),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.number().min(5).max(16),
})
  .or("name", "email", "phone")
  .required();
