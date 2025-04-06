import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { appSettings } from 'src/configs/app-settings';

@Injectable()
export class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: appSettings.mail.email,
                pass: appSettings.mail.appPass,
            },
        });
    }

    async handleSendEmail(message: any) {
        const { email, subject, text, html } = message;

        const mailOptions = {
            from: '"Support Team" <support@yourdomain.com>',
            to: email,
            subject,
            text,
            html,
        };

        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', email);
        return { success: true };
    }
}
