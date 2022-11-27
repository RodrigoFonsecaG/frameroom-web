import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplate from '../../TemplateMailProvider/models/IMailTemplate';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class EtherealMail {
    private client: Transporter;

    constructor(
        private mailTemplateProvider: IMailTemplate
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void> {

        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe FrameRoom',
                address: from?.email || 'equipe@frameroom.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

         console.log('Message sent: %s', message.messageId);
         // Preview only available when sending through an Ethereal account
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
