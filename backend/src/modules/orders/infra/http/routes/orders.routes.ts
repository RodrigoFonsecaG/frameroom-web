import { Router } from 'express';

import {ensureAuthenticated} from '@modules/users/infra/http/middlewares/ensureAnthenticated';
import OrdersController from '../controllers/OrdersController';
import { needAdmin } from '@modules/users/infra/http/middlewares/permissions';

const ordersRouter = Router();
const ordersController = new OrdersController();

// Usando middleware em todas as rotas de agendamento
ordersRouter.use(ensureAuthenticated());

ordersRouter.get('/', needAdmin(), ordersController.index);

ordersRouter.post('/', ordersController.create);
ordersRouter.delete('/:order_code', needAdmin(), ordersController.delete);

ordersRouter.get('/:order_code', needAdmin(), ordersController.show);

export default ordersRouter;
