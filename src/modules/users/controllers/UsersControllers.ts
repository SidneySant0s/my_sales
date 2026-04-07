import CreateUserService from "../services/CreateUserService";
import ListUsersServices from "../services/ListUsersServices";
import { Request, Response } from "express";

export default class UsersRepositories{
  async index(request: Request, response: Response): Promise <Response> {
    const listUsers = new ListUsersServices();

    const users = await listUsers.execute();
    return response.json(users)
  }

  async create(request: Request, response: Response): Promise <Response> {
    const {name, email, password} = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(user);
  }

}
