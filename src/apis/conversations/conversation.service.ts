import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { ConversationDocument } from './entities/conversation.entity';
import { ExtendedInjectModel } from '@libs/super-core';
import { COLLECTION_NAMES } from 'src/constants';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { ExtendedPagingDto } from 'src/pipes/page-result.dto.pipe';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Types } from 'mongoose';

@Injectable()
export class ConversationService extends BaseService<ConversationDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.CONVERSATION)
        private readonly conversationModel: ExtendedModel<ConversationDocument>,
    ) {
        super(conversationModel);
    }
    async getAll(queryParams: ExtendedPagingDto) {
        const result = await this.getAll(queryParams);
        return result;
    }

    async createOne(dto: CreateConversationDto) {
        const newConversation = await this.conversationModel.create({
            members: [dto.senderId, dto.receiverId],
        });
        return newConversation;
    }

    async getByUserId(id: string) {
        return await this.conversationModel
            .find({
                members: { $in: [new Types.ObjectId(id)] },
            })
            .exec();
    }
}
