import { Request, Response } from "express";
import SendForgoPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  async create( request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailServices = new SendForgoPasswordEmailService();

    await sendForgotPasswordEmailServices.execute({ email });

    return response.status(204).json();
  }
}
