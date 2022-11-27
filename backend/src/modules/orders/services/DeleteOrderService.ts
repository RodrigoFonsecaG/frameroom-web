import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';


class DeleteOrderService {
    public async execute(order_code: string) {
        const ordersRepository = getRepository(Order);

        const findOrder = await ordersRepository.findOne(order_code);

        if (!findOrder) {
            throw new AppError('This order doesnt exists!');
        }

        await ordersRepository.delete(order_code);

        return;
    }
}

export default DeleteOrderService;
