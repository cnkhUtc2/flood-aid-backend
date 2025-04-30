import { BadRequestException, Injectable } from '@nestjs/common';
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
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
import { FileDocument } from '../media/entities/files.entity';
import { Types } from 'mongoose';

@Injectable()
export class SupportTicketService extends BaseService<SupportTicketDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.SUPPORT_TICKET)
        private readonly supportTicketModel: ExtendedModel<SupportTicketDocument>,
        private readonly mediaService: MediaService,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {
        super(supportTicketModel);
    }

    async createOne(
        payload: CreateSupportTicketDto,
        user: UserPayload,
        attachments?: IUploadedMulterFile[],
    ) {
        const { _id: userId, email } = user;

        let attachmentIds: Types.ObjectId[] = [];

        if (attachments) {
            const uploadedFiles = await this.uploadAttachments(
                attachments,
                user,
            );
            attachmentIds = uploadedFiles.map((file) => file._id);
        }

        const result = await this.supportTicketModel.create({
            ...payload,
            createdBy: userId,
            attachments: attachmentIds,
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

    async uploadAttachments(
        attachments: IUploadedMulterFile[],
        user: UserPayload,
    ) {
        if (!attachments || attachments.length === 0) {
            throw new BadRequestException('attachments is empty');
        }

        const uploadedFiles: FileDocument[] = [];

        for (const file of attachments) {
            const uploaded = await this.mediaService.createFile(
                file,
                user,
                'support-tickets',
            );
            uploadedFiles.push(uploaded);
        }

        return uploadedFiles;
    }
}
