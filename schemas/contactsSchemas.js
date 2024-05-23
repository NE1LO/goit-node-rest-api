import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(5).max(30), // Оновлено на 30 символів
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(30), // Оновлено на 30 символів
})
  .min(1)
  .message("Body must have at least one field");
