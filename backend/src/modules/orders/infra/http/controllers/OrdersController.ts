import Order from '@modules/orders/infra/typeorm/entities/Order';
import { getRepository } from 'typeorm';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import { Request, Response } from 'express';

export default class OrdersController {
    public async create(
        request: Request,
        response: Response,
    ) {
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
    }

    public async index(
        request: Request,
        response: Response,
    ) {
        const ordersRepository = getRepository(Order);
        const orders = await ordersRepository.find();

        return response.json(orders);
    }


}
