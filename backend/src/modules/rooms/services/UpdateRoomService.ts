import { getCustomRepository, getRepository } from 'typeorm';
import Room from '../infra/typeorm/entities/Room';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import createRoomCode from '@shared/utils/createRoomCode';
import AppError from '@shared/errors/AppError';
import RoomsRepository from '../infra/typeorm/repositories/RoomsRepository';
import IRoomsRepository from '../repositories/IRoomsRepository';

interface RequestCTO {
    room_code: string;
    room_type: string;
    room_number: number;
    capacity: number;
    floor: number;
    description: string;
    availability: number;
    image?: string;
}

class UpdateRoomService {
    constructor(private roomsRepository: IRoomsRepository) { }

    public async execute({
        room_code,
        room_type,
        room_number,
        capacity,
        floor,
        description,
        availability,
        image,
    }: RequestCTO): Promise<Room> {

        const room = await this.roomsRepository.findRoom(room_code);

        if (!room) {
            throw new AppError('Room not founded');
        }

        if (image) {
            if (room.image) {
                //Deletar imagem anterior
                const roomImageFilePath = path.join(
                    uploadConfig.directory,
                    room.image,
                );

                const roomImageFileExists = await fs.promises.stat(
                    roomImageFilePath,
                );

                if (roomImageFileExists) {
                    await fs.promises.unlink(roomImageFilePath);
                }
            }
        }

        const updatedCode = createRoomCode(room_type, room_number);

        // const updatedRoom = {
        //     room_code: updatedCode,
        //     room_type,
        //     room_number,
        //     capacity,
        //     floor,
        //     description,
        //     availability,
        //     image: image ? image : room.image,
        // };

        console.log(updatedCode);

        const updatedRoom = this.roomsRepository.update({
            old_room_code: room_code,
            room_code: updatedCode,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image: image ? image : room.image,
        });

        return updatedRoom;
    }
}

export default UpdateRoomService;
