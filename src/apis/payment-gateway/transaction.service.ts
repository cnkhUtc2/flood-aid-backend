import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { BaseService } from 'src/base/service/base.service';
import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { TransactionDocument } from './entities/transaction.entity';

@Injectable()
export class TransactionService extends BaseService<TransactionDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.TRANSACTION)
        private readonly transactionModel: ExtendedModel<TransactionDocument>,
    ) {
        super(transactionModel);
    }
}
