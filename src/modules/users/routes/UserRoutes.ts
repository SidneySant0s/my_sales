import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const userRouter = Router();
const usersController = new UsersControllers();

userRouter.get('/', usersController.index);
userRouter.post('/', createUserSchema, usersController.create);

export default userRouter;
