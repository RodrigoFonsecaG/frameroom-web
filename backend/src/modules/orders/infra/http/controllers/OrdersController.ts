import Order from '@modules/orders/infra/typeorm/entities/Order';
import { getRepository } from 'typeorm';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';
import { Request, Response } from 'express';
import SendOrderEmailService from '@modules/orders/services/SendOrderEmailService';

export default class OrdersController {
    public async create(request: Request, response: Response) {
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

    public async index(request: Request, response: Response) {
        const ordersRepository = getRepository(Order);
        const orders = await ordersRepository.query(`
        SELECT orders.order_code, orders.date, orders.hour_start, orders.hour_end, rooms.room_type, rooms.room_number, users.name, users.type_code, users_type.type
        FROM orders
        LEFT JOIN rooms
        ON orders.room_code = rooms.room_code
        LEFT JOIN users
        ON users.cpf = orders.user_cpf
        LEFT JOIN users_type
        ON users.type_code = users_type.type_code
        ;`);

        return response.json(orders);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const order_code = request.params.order_code;

        const ordersRepository = getRepository(Order);
        const order = await ordersRepository.query(`
               SELECT orders.order_code, orders.date, orders.message, orders.hour_start, orders.hour_end, rooms.room_type, rooms.room_code, rooms.room_number, users.name, users.type_code, users.phone, users.email, users_type.type
        FROM orders
        LEFT JOIN rooms
        ON orders.room_code = rooms.room_code
        LEFT JOIN users
        ON users.cpf = orders.user_cpf
        LEFT JOIN users_type
        ON users.type_code = users_type.type_code
        WHERE orders.order_code = '${order_code}'
        ;
        `);

        if (!order) {
            throw new Error('Order doesnt exists!');
        }

        return response.json(order);
    }

    public async update(request: Request, response: Response) {
        const order_code = request.params.order_code;
        const { order, state } = request.body;

        const sendOrderEmail = new SendOrderEmailService();

        const sendOrder = await sendOrderEmail.execute({state, order});


        // const deleteOrder = new DeleteOrderService();
        // await deleteOrder.execute(order_code);

        return response.json(sendOrder);
    }
}
