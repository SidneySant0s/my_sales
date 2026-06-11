import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { usertokensRepositories } from "../infra/database/repositories/UserTokensRepositories";
import { isAfter, addHours} from "date-fns";
import { hash } from "bcrypt";

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  async execute({ token, password}: IResetPassword): Promise<void> {
    const userToken = await usertokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not exists', 404);
    }

    const user = await usersRepositories.findbyId(userToken.id);

    if(!user) {
      throw new AppError('User not exists.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired', 401);
    }

    user.password = await hash(password, 10);

    await usersRepositories.save(user);
  }
}
