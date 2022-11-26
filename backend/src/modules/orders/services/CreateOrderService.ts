import AppError from '@shared/errors/AppError';
import Room from '@modules/rooms/infra/typeorm/entities/Room';
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
        const roomsRepository = getRepository(Room);

        //Verificando se o espaço está disponivel para resevar
        const findRoom = await roomsRepository.findOne(room_code);


        if (!findRoom) {
            throw new AppError('This room doesnt exists!');
        }

        if (findRoom && findRoom.availability !== 1) {
            throw new AppError('This room is not availabled to order!');
        }


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
