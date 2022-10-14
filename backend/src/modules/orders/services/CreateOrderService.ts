import { getRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';

interface Request {
    date: Date;
    hour_start: Date;
    hour_end: Date;
    user_cpf: string;
    room_code: string;
    message: string;
}

class CreateOrderService {
    public async execute({
        date,
        hour_start,
        hour_end,
        user_cpf,
        room_code,
        message,
    }: Request): Promise<Order> {
        const ordersRepository = getRepository(Order);

        const order = ordersRepository.create({
            date,
            hour_start,
            hour_end,
            user_cpf,
            room_code,
            message,
        });

        await ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
