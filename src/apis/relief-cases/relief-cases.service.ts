import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { ReliefCaseDocument } from './entities/relief-case.entity';
import { ExtendedInjectModel } from '@libs/super-core';
import { COLLECTION_NAMES } from 'src/constants';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { ClientProxy } from '@nestjs/microservices';
import { CreateReliefCaseDto } from './dto/create-relief-case.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { htmlContent } from '../mail/html/relief-case-notification';
import { UserService } from '../users/user.service';
import { SupportTicketService } from '../tickets/ticket.service';
import { Types } from 'mongoose';

@Injectable()
export class ReliefCasesService extends BaseService<ReliefCaseDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.RELIEF_CASE)
        private readonly reliefCaseModel: ExtendedModel<ReliefCaseDocument>,
        private readonly userService: UserService,
        private readonly supportTicketService: SupportTicketService,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {
        super(reliefCaseModel);
    }

    async createOne(
        payload: CreateReliefCaseDto,
        user: UserPayload,
        options?: Record<string, any>,
    ) {
        const { _id: userId } = user;

        const result = await this.reliefCaseModel.create({
            ...payload,
            ...options,
            createdBy: userId,
        });

        const supportTicket = await this.supportTicketService.getOne(
            new Types.ObjectId(payload.supportTicket),
        );

        const victim = await this.userService.model
            .findById(new Types.ObjectId(supportTicket.createdBy._id))
            .exec();

        const { email } = victim;

        if (result) {
            const message = {
                email,
                subject: 'Your case has been accepted',
                text: `We have posted your case to our main blog page where philanthropists can offer assistance`,
                html: htmlContent,
            };

            await this.client.emit('send_email', message);

            return result;
        }
    }
}
