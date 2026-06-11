import { Router } from "express";
import { celebrate } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordControllers";
import ResetPasswordController from "../controllers/ResetPasswordControllers";
import { ForgotPasswordSchemas, ResetPasswordSchema } from "../schemas/PasswordSchemas";


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', celebrate({body: ForgotPasswordSchemas}) , forgotPasswordController.create);

passwordRouter.post('/reset', celebrate({body: ResetPasswordSchema}), resetPasswordController.create);

export default passwordRouter;
