import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAnthenticated';
import RoomsRepository from '@modules/rooms/repositories/RoomsRepository';
import CreateRoomService from '@modules/rooms/services/CreateRoomService';

import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateRoomService from '@modules/rooms/services/UpdateRoomService';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

const roomsRouter = Router();
const upload = multer(uploadConfig);

roomsRouter.get('/', async (request, response) => {
    try {
        const roomsRepository = getCustomRepository(RoomsRepository);
        const rooms = await roomsRepository.find();

        return response.json(rooms);
    } catch (error) {
        console.error(error);
    }
});

roomsRouter.get('/:room_code', async (request, response) => {
    const room_code = request.params.room_code;

    const roomsRepository = getRepository(Room);
    const room = await roomsRepository.find({
        where: { room_code },
    });

    return response.json(room);
});

roomsRouter.post(
    '/',
    ensureAuthenticated,
    upload.single('image'),
    async (request, response) => {
        const {
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
        } = request.body;

        console.log(request.file);
        console.log(request.body);

        const { filename } = request.file;

        const createRoom = new CreateRoomService();

        const room = await createRoom.execute({
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
            image: filename,
        });

        return response.json(room);
    },
);

roomsRouter.put(
    '/',
    ensureAuthenticated,
    upload.single('image'),
    async (request, response) => {
        const {
            room_code,
            room_type,
            room_number,
            capacity,
            floor,
            description,
            availability,
        } = request.body;

        const updateRoom = new UpdateRoomService();

        console.log(!!request.file);

        if (!!request.file) {
            const room = await updateRoom.execute({
                room_code,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
                image: request.file.filename,
            });

            return response.json(room);
        } else {
            const room = await updateRoom.execute({
                room_code,
                room_type,
                room_number,
                capacity,
                floor,
                description,
                availability,
            });

            return response.json(room);
        }
    },
);

export default roomsRouter;
