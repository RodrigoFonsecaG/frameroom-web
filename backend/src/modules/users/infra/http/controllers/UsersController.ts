import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class UsersController {
    public async create(request: Request, response: Response) {
        const {
            cpf,
            name,
            phone,
            email,
            password,
            passwordConfirm,
            type_code,
        } = request.body;

        const usersRepository = new UsersRepository();
        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({
            cpf,
            name,
            phone,
            email,
            password,
            passwordConfirm,
            type_code,
        });

        delete user.password;

        return response.json(user);
    }
}
