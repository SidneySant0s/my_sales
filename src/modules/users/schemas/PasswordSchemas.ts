import { Joi } from "celebrate";

export const ForgotPasswordSchemas = Joi.object({

    email: Joi.string().email().required(),

});

export const ResetPasswordSchema = Joi.object({

    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_corfirmation: Joi.string().valid(Joi.ref('password')).required(),

});

