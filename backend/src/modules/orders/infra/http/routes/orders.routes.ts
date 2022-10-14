import { Router } from 'express';
import { getRepository } from 'typeorm';


import Order from '@modules/orders/infra/typeorm/entities/Order';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAnthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

// Usando middleware em todas as rotas de agendamento
ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', ordersController.index);

ordersRouter.post('/', ordersController.create);

export default ordersRouter;
