import AppError from '@shared/errors/AppError';
import Room from '../infra/typeorm/entities/Room';
import createRoomCode from '@shared/utils/createRoomCode';
import IRoomsRepository from '../repositories/IRoomsRepository';



class CreateRoomService {
    constructor(private roomsRepository: IRoomsRepository) {}

    public async execute(room_code: string): Promise<Room> {

        //Verificando se sala já existe
        const findRoom = await this.roomsRepository.findRoom(room_code);

        if (!findRoom) {
            throw new AppError('This room doesnt exists!');
        }

        // Criando espaço
        const room = await this.roomsRepository.delete(room_code);

        return room;
    }
}

export default CreateRoomService;
