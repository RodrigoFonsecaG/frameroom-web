import { Router } from 'express';
import { getRepository } from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAnthenticated';

const ordersRouter = Router();

// Usando middleware em todas as rotas de agendamento
ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', async (request, response) => {
    const ordersRepository = getRepository(Order);
    const orders = await ordersRepository.find();

    return response.json(orders);
});

ordersRouter.post('/', async (request, response) => {
    const { date, hour_start, hour_end, user_cpf, room_code, message } =
        request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
        date,
        hour_start,
        hour_end,
        user_cpf,
        room_code,
        message,
    });

    return response.json(order);
});

export default ordersRouter;
