import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { SentimentDocument } from './entities/sentiment.entity';
import { ExtendedInjectModel } from '@libs/super-core';
import { COLLECTION_NAMES } from 'src/constants';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';

@Injectable()
export class SentimentsService extends BaseService<SentimentDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.SENTIMENT)
        private readonly sentimentModel: ExtendedModel<SentimentDocument>,
    ) {
        super(sentimentModel);
    }
}
