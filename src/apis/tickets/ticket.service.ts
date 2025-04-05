import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'; // Import ClientProxy for message sending
import { Inject } from '@nestjs/common'; // Import Inject from @nestjs/common
import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { SupportTicketDocument } from './entities/support-ticket.entity';
import { UserPayload } from 'src/base/models/user-payload.model';
import { COLLECTION_NAMES } from 'src/constants';
import { BaseService } from 'src/base/service/base.service';
import { htmlContent } from '../mail/html/content';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SupportTicketService extends BaseService<SupportTicketDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.SUPPORT_TICKET)
        private readonly supportTicketModel: ExtendedModel<SupportTicketDocument>,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy, // Inject RabbitMQ client to publish messages
    ) {
        super(supportTicketModel);
    }

    async createOne(
        payload: any,
        user: UserPayload,
        options?: Record<string, any>,
    ) {
        const { _id: userId, email } = user;

        // Create the support ticket in the database
        const result = await this.model.create({
            ...payload,
            ...options,
            createdBy: userId,
        });

        // If the ticket was created successfully, send a message to RabbitMQ
        if (result) {
            const message = {
                email,
                subject: 'Support Ticket Submitted Successfully',
                text: `Thank you for submitting your support ticket. We will contact you within 3 business days.`,
                html: htmlContent,
            };

            // Publish the message to RabbitMQ queue for email processing
            await this.client.emit('send_email', message);

            // Return the created ticket result
            return result;
        }
    }
}
