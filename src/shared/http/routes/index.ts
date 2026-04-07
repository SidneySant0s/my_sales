import productsRouter from '@modules/products/routes/ProductRoutes';
import sessionsRoouter from '@modules/users/routes/SessionRoutes';
import userRouter from '@modules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello Dev I am Alive'});
})

routes.use('/products',productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRoouter);

export default routes;
