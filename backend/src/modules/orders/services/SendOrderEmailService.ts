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
        try {
            if (!order) {
                throw new AppError('Order does not existed');
            }

            console.log(order)

            let orderMailTemplate;

            if (state === 'approve') {
                orderMailTemplate = path.resolve(
                    __dirname,
                    '..',
                    'views',
                    'approve_order_mail.hbs',
                );
            } else if (state === 'contact') {
                orderMailTemplate = path.resolve(
                    __dirname,
                    '..',
                    'views',
                    'contact_order_mail.hbs',
                );
            } else {
                orderMailTemplate = path.resolve(
                    __dirname,
                    '..',
                    'views',
                    'reject_order_mail.hbs',
                );
            }

            console.log(order)

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
                        link: `https://frameroom-web.vercel.app/rooms/${order.room_code}`,
                        room: `${order.room_type} ${order.room_number}`,
                        contact: order.contact ? order.contact : '',
                        week: order.date,
                        intervals: order.intervals,
                    },
                },
            });
        } catch (error) {
            console.error(error)
        }
    }
}

export default SendOrderEmailService;
