import { Router } from 'express';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAnthenticated';

import { needAdmin } from '@modules/users/infra/http/middlewares/permissions';


import NonFixedScheduleController from '../controllers/NonFixedScheduleController';

const scheduleRouter = Router();

const nonFixedScheduleController = new NonFixedScheduleController();


scheduleRouter.get('/:room_code', nonFixedScheduleController.index);

scheduleRouter.post(
    '/',
    ensureAuthenticated(),
    needAdmin(),
    nonFixedScheduleController.create,
);


export default scheduleRouter;
