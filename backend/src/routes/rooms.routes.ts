import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAnthenticated';
import RoomsRepository from '../repositories/RoomsRepository';
import CreateRoomService from '../services/CreateRoomService';

import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateRoomService from '../services/UpdateRoomService';
import Room from '../models/Room';

const roomsRouter = Router();
const upload = multer(uploadConfig);

roomsRouter.get('/', async (request, response) => {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const rooms = await roomsRepository.find();

    return response.json(rooms);
});

roomsRouter.get('/:room_code', async (request, response) => {
    const room_code = request.params.room_code;

    const roomsRepository = getRepository(Room);
    const room = await roomsRepository.find({
        where: {room_code}
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
        const { filename } = request.file;

        const updateRoom = new UpdateRoomService();

       const room = await updateRoom.execute({
            room_code,
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

export default roomsRouter;
