import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories"
//import { usertokensRepositories } from "../database/repositories/UserTokensRepositories";
//import { sendEmail } from "@config/email";

interface IForgotPassword {
  email:string
}


export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if(!user) {
      throw new AppError('User not found', 404);
    }

    //const token = await usertokensRepositories.generate(user.id);



  }
}
