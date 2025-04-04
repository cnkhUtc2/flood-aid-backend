import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { SupportTicketDocument } from './entities/support-ticket.entity';
import { BaseService } from 'src/base/service/base.service';
import { UserPayload } from 'src/base/models/user-payload.model';

@Injectable()
export class SupportTicketService extends BaseService<SupportTicketDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.SUPPORT_TICKET)
        private readonly supportTicketMoel: ExtendedModel<SupportTicketDocument>,
    ) {
        super(supportTicketMoel);
    }

    async createOne(
        payload: any,
        user: UserPayload,
        options?: Record<string, any>,
    ) {
        const { _id: userId } = user;

        const result = await this.model.create({
            ...payload,
            ...options,
            createdBy: userId,
        });
        return result;
    }
}
