import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import EtherealMail from '@shared/providers/Mails/MailProvider/implementations/EterealMail';
import HandlebarsMailTemplate from '@shared/providers/Mails/TemplateMailProvider/implementations/HandlebarsMailTemplate';
import path from 'path';
import ProdMail from '@shared/providers/Mails/MailProvider/implementations/ProdMail';

interface IRequest {
    email: string;
}

//const ethereal = new EtherealMail(new HandlebarsMailTemplate());
const prodMail = new ProdMail(new HandlebarsMailTemplate());

class SendForgotPasswordEmailService {
    constructor(
        private usersRepository: IUsersRepository,
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);


        if (!user) {
            throw new AppError('User does not exists');
        }

        const { token } = await this.userTokensRepository.generate(user.cpf);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );
        //Envia e-mail
        await prodMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[FrameRoom] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `https://frameroom-web.vercel.app/rooms/reset-password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
