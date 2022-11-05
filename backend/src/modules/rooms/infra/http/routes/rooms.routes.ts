import { Router } from 'express';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAnthenticated';

import { needAdmin } from '@modules/users/infra/http/middlewares/permissions';

import multer from 'multer';
import uploadConfig from '@config/upload';
import RoomsController from '../controllers/RoomsController';

const roomsRouter = Router();
const upload = multer(uploadConfig);

const roomsController = new RoomsController();

roomsRouter.get('/', roomsController.index);

roomsRouter.get('/:room_code', roomsController.show);

roomsRouter.post(
    '/',
    ensureAuthenticated(),
    needAdmin(),
    upload.single('image'),
    roomsController.create,
);

roomsRouter.put(
    '/',
    ensureAuthenticated(),
    needAdmin(),
    upload.single('image'),
    roomsController.update,
);

roomsRouter.delete(
    '/:id',
    ensureAuthenticated(),
    needAdmin(),
    roomsController.delete,
);

export default roomsRouter;
