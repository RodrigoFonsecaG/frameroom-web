import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
    public async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = new UsersRepository();
        const authenticateUser = new AuthenticateUserService(usersRepository);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });


        return response.json({ user: instanceToInstance(user), token });
    }
}
