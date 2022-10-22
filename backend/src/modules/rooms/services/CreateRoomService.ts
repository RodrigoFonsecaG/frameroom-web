import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Room from '../infra/typeorm/entities/Room';
import RoomsRepository from '../infra/typeorm/repositories/RoomsRepository';
import createRoomCode from '@shared/utils/createRoomCode';
import IRoomsRepository from '../repositories/IRoomsRepository';


interface CreateRoomDTO {
    room_code?: string;
    room_type: string;
    room_number: number;
    capacity: number;
    floor: number;
    description: string;
    availability: number;
    image: string;
}

class CreateRoomService {
    constructor(private roomsRepository: IRoomsRepository) { }

    public async execute({
        room_type,
        room_number,
        capacity,
        floor,
        description,
        availability,
        image,
    }: CreateRoomDTO): Promise<Room> {

        //Criando código do espaço
        const room_code = createRoomCode(room_type, room_number);

        //Verificando se sala já existe
        const findRoom = await this.roomsRepository.findRoom(room_code);

        if (findRoom) {
            throw new AppError('This room is already created!');
        }

        // Criando espaço
        const room = await this.roomsRepository.create({
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image,
        });

        return room;
    }
}

export default CreateRoomService;
