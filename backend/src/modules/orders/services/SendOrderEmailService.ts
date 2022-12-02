import AppError from '@shared/errors/AppError';
import HandlebarsMailTemplate from '@shared/providers/Mails/TemplateMailProvider/implementations/HandlebarsMailTemplate';
import path from 'path';
import ProdMail from '@shared/providers/Mails/MailProvider/implementations/ProdMail';
import Order from '../infra/typeorm/entities/Order';
import Room from '@modules/rooms/infra/typeorm/entities/Room';
import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

//const ethereal = new EtherealMail(new HandlebarsMailTemplate());
const prodMail = new ProdMail(new HandlebarsMailTemplate());

class SendOrderEmailService {
    public async execute({ order, state }): Promise<void> {

        if (!order) {
            throw new AppError('Order does not existed');
        }

        let orderMailTemplate;

        if (state === 'approve') {
            orderMailTemplate = path.resolve(
                __dirname,
                '..',
                'views',
                'approve_order_mail.hbs',
            );
        }
        else if (state === 'contact') {
            orderMailTemplate = path.resolve(
                __dirname,
                '..',
                'views',
                'contact_order_mail.hbs',
            );
        }
        else {
            orderMailTemplate = path.resolve(
                __dirname,
                '..',
                'views',
                'reject_order_mail.hbs',
            );
        }


        //Envia e-mail
        await prodMail.sendMail({
            to: {
                name: order.name,
                email: order.email,
            },
            subject: '[FrameRoom] Solicitação de reserva de espaço',
            templateData: {
                file: orderMailTemplate,
                variables: {
                    name: order.name,
                    date: order.date,
                    hour: order.hour,
                    link: `${process.env.APP_WEB_URL}/rooms/${order.room_code}`,
                    room: `${order.room_type} ${order.room_number}`,
                    contact: order.contact ? order.contact : ''
                },
            },
        });
    }
}

export default SendOrderEmailService;