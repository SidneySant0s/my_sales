import AuthMiddleware from "@shared/middlewares/authMiddleware";
import OrderController from "../controllers/OrdersControllers";
//import { celebrate } from "celebrate";
import { Router } from "express";
import { createOrderValidate, idParamsValidate } from "../schemas/OrdersSchemas";

const ordersRouter = Router();
const ordersController = new OrderController();

ordersRouter.use(AuthMiddleware.execute);

ordersRouter.get('/:id', idParamsValidate,ordersController.show);
ordersRouter.post('/', createOrderValidate,ordersController.create);
export default ordersRouter;

