import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplate from '../../TemplateMailProvider/models/IMailTemplate';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class ProdMail {
    private client: Transporter;

    constructor(private mailTemplateProvider: IMailTemplate) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        this.client = transporter;
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
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
