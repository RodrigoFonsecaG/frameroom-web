import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

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

        const createUser = new CreateUserService();

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
