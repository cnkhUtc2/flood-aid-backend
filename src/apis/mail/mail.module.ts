import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MailController } from './controllers/mail.controller';

@Module({
    controllers: [MailController],
    providers: [
        {
            provide: 'MAIL_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
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
