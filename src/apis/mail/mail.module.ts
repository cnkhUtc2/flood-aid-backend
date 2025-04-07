import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MailController } from './controllers/mail.controller';
import { appSettings } from 'src/configs/app-settings';

@Module({
    controllers: [MailController],
    providers: [
        {
            provide: 'MAIL_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [appSettings.rabbitmq.url],
                        queue: 'email_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
        },
        MailService,
    ],
    exports: [MailService, 'MAIL_SERVICE'],
})
export class MailModule {}
