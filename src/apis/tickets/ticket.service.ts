import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { SupportTicketDocument } from './entities/support-ticket.entity';
import { UserPayload } from 'src/base/models/user-payload.model';
import { COLLECTION_NAMES } from 'src/constants';
import { BaseService } from 'src/base/service/base.service';
import { htmlContent } from '../mail/html/support-ticket-notification';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';

@Injectable()
export class SupportTicketService extends BaseService<SupportTicketDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.SUPPORT_TICKET)
        private readonly supportTicketModel: ExtendedModel<SupportTicketDocument>,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {
        super(supportTicketModel);
    }

    async createOne(
        payload: CreateSupportTicketDto,
        user: UserPayload,
        options?: Record<string, any>,
    ) {
        const { _id: userId, email } = user;

        const result = await this.supportTicketModel.create({
            ...payload,
            ...options,
            createdBy: userId,
        });

        if (result) {
            const message = {
                email,
                subject: 'Support Ticket Submitted Successfully',
                text: `Thank you for submitting your support ticket. We will contact you within 3 business days.`,
                html: htmlContent,
            };

            await this.client.emit('send_email', message);

            return result;
        }
    }
}
