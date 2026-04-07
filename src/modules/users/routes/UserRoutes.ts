import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const userRouter = Router();
const usersController = new UsersControllers();

userRouter.get('/', AuthMiddleware.execute, usersController.index);
userRouter.post('/', createUserSchema, usersController.create);

export default userRouter;
