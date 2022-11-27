import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../../typeorm/repositories/UserTokenRepository';

export default class ResetPasswordController {
    public async create(request: Request, response: Response) {
        const { password, token } = request.body;

        const usersRepository = new UsersRepository();
        const usersTokenRepository = new UserTokenRepository();

        const resetPasswordService = new ResetPasswordService(
            usersRepository,
            usersTokenRepository,
        );

        await resetPasswordService.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
