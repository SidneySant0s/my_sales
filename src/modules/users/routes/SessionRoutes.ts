import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "../schemas/SessionSchema";

const sessionsRoouter = Router();
const sessionsController = new SessionsControllers();

sessionsRoouter.post('/', sessionSchema, sessionsController.create);

export default sessionsRoouter;
