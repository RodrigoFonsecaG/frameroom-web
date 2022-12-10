import { Router } from 'express';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import roomsRouter from '@modules/rooms/infra/http/routes/rooms.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import scheduleRouter from '@modules/schedules/infra/http/routes/schedule.routes';
import nonFixedScheduleRouter from '@modules/non-fixed-schedules/infra/http/routes/non-fixed-schedule.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes'

const routes = Router();

routes.use('/rooms', roomsRouter);
routes.use('/users', usersRouter);
routes.use('/schedules', scheduleRouter);
routes.use('/non-fixed-schedules', nonFixedScheduleRouter);
routes.use('/orders', ordersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
