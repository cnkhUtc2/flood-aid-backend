import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { MessageDocument } from './entities/message.entity';
import { ExtendedInjectModel } from '@libs/super-core';
import { COLLECTION_NAMES } from 'src/constants';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserPayload } from 'src/base/models/user-payload.model';

@Injectable()
export class MessageService extends BaseService<MessageDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.MESSAGE)
        private readonly messageModel: ExtendedModel<MessageDocument>,
    ) {
        super(messageModel);
    }
    async create(dto: CreateMessageDto, userPayload: UserPayload) {
        const newMessage = await this.createOne(dto, userPayload);
        return newMessage;
    }

    async getById(id: string) {
        return this.getOne(id);
    }
}
