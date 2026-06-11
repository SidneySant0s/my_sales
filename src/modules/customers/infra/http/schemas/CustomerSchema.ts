import { celebrate, Joi, Segments } from "celebrate";

export const idParamsValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const createCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
});

export const updateCustomerSchemas = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
  }
});
