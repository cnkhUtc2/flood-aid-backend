import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { ConversationDocument } from './entities/conversation.entity';
import { ExtendedInjectModel } from '@libs/super-core';
import { COLLECTION_NAMES } from 'src/constants';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { ExtendedPagingDto } from 'src/pipes/page-result.dto.pipe';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService extends BaseService<ConversationDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.CONVERSATION)
        private readonly conversationModel: ExtendedModel<ConversationDocument>,
    ) {
        super(conversationModel);
    }
    async getAll(queryParams: ExtendedPagingDto) {
        const result = this.getAll(queryParams);
        return result;
    }

    async creatOne(dto: CreateConversationDto) {
        const newConversation = this.creatOne(dto);
        return newConversation;
    }

    getByUserId(id: string) {
        return this.conversationModel.find({
            members: { $in: [id] },
        });
    }
}
