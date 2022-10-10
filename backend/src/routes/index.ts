import { Router } from 'express';
import ordersRouter from './orders.routes';
import roomsRouter from './rooms.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/rooms', roomsRouter);
routes.use('/users', usersRouter);
routes.use('/orders', ordersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

