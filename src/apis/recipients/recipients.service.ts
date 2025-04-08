import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { BaseService } from 'src/base/service/base.service';
import { RecipientDocument } from './entities/recipient.entity';
import { CreateRecipientDto } from './dto/create-recipient.dto';

@Injectable()
export class RecipientsService extends BaseService<RecipientDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.RECIPIENT)
        private readonly recipientModel: ExtendedModel<RecipientDocument>,
    ) {
        super(recipientModel);
    }

    async createOne(recipient: CreateRecipientDto) {
        const newRecipient = await this.recipientModel.create(recipient);
        return newRecipient;
    }

    async getOne(options?: Record<string, any>) {
        const result = await this.recipientModel.findOne(options).exec();
        return result;
    }
}
