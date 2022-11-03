import { Router } from 'express';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAnthenticated';

import { needAdmin } from '@modules/users/infra/http/middlewares/permissions';


import SchedulesController from '../controllers/SchedulesController';

const scheduleRouter = Router();

const schedulesController = new SchedulesController();


scheduleRouter.get('/:room_code', schedulesController.index);

scheduleRouter.post(
    '/',
    ensureAuthenticated(),
    needAdmin(),
    schedulesController.create,
);


export default scheduleRouter;
