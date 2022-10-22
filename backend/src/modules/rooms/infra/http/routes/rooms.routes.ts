import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAnthenticated';


import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateRoomService from '@modules/rooms/services/UpdateRoomService';
import Room from '@modules/rooms/infra/typeorm/entities/Room';
import RoomsController from '../controllers/RoomsController';
import RoomsRepository from '../../typeorm/repositories/RoomsRepository';


const roomsRouter = Router();
const upload = multer(uploadConfig);

const roomsController = new RoomsController();

roomsRouter.get('/', roomsController.index);

roomsRouter.get('/:room_code', roomsController.show);

roomsRouter.post(
    '/',
    ensureAuthenticated,
    upload.single('image'),
    roomsController.create,
);

roomsRouter.put(
    '/',
    ensureAuthenticated,
    upload.single('image'),
    roomsController.update
);

export default roomsRouter;
