import { celebrate, Joi, Segments } from "celebrate";

export const ForgotPasswordSchemas = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export const ResetPasswordSchema = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_corfirmation: Joi.string().valid(Joi.ref('password')).required(),
  }
});

