import { Router } from 'express';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import roomsRouter from '@modules/rooms/infra/http/routes/rooms.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/rooms', roomsRouter);
routes.use('/users', usersRouter);
routes.use('/orders', ordersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;