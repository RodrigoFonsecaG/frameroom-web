import { getRepository } from 'typeorm';
import Room from '../models/Room';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import createRoomCode from '../utils/createRoomCode';
import AppError from '../errors/AppError';

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
        const roomsRepository = getRepository(Room);

        const room = await roomsRepository.findOne(room_code);

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

        const updatedRoom = {
            room_code: updatedCode,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image: image ? image : room.image,
        };

        roomsRepository.update(
            { room_code },
            {
                room_code: updatedCode,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
                image: image ? image : room.image,
            },
        );

        return updatedRoom;
    }
}

export default UpdateRoomService;
