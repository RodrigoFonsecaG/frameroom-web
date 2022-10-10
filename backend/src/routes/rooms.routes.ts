import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAnthenticated';
import RoomsRepository from '../repositories/RoomsRepository';
import CreateRoomService from '../services/CreateRoomService';

import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateRoomService from '../services/UpdateRoomService';

const roomsRouter = Router();
const upload = multer(uploadConfig);

roomsRouter.get('/', async (request, response) => {
    const roomsRepository = getCustomRepository(RoomsRepository);
    const rooms = await roomsRepository.find();

    return response.json(rooms);
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
