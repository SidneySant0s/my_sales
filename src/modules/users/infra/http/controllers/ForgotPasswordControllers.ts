import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import { Request, Response } from "express";

export default class ForgotPasswordController {
  async create( request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();



    try{
      await sendForgotPasswordEmail.execute({ email });
      return response.status(200).json({ message: "Service executado com sucesso" });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return response.status(500).json({ type: "error", message: "Internal server error" });
    }

  }
}
