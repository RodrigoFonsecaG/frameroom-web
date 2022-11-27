import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../../typeorm/repositories/UserTokenRepository';

export default class ForgotPasswordController {
    public async create(request: Request, response: Response) {
        const { email } = request.body;

        const usersRepository = new UsersRepository();
        const userTokenRepository = new UserTokensRepository();

        const sendForgotPasswordEmailService =
            new SendForgotPasswordEmailService(
                usersRepository,
                userTokenRepository,
            );

        await sendForgotPasswordEmailService.execute({
            email,
        });


        return response.status(204).json();
    }
}
