import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController()

usersRouter.post('/', usersController.create);

export default usersRouter;
