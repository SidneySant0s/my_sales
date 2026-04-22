import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordControllers";
import ResetPasswordController from "../controllers/ResetPasswordControllers";
import { ForgotPasswordSchemas, ResetPasswordSchema } from "../schemas/PasswordSchemas";


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', ForgotPasswordSchemas, forgotPasswordController.create);

passwordRouter.post('/reset', ResetPasswordSchema, resetPasswordController.create);

export default passwordRouter;
