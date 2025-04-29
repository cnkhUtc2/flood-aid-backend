import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.TRANSACTION,
})
export class Transaction extends AggregateRoot {
    @SuperProp({
        type: String,
    })
    txnRef: string;

    @SuperProp({
        type: Number,
    })
    amount: string;

    @SuperProp({
        type: String,
    })
    bankCode: string;

    @SuperProp({
        type: String,
    })
    bankTranNo: string;

    @SuperProp({
        type: String,
    })
    cardType: string;

    @SuperProp({
        type: String,
    })
    orderInfo: string;

    @SuperProp({
        type: String,
    })
    payDate: string;

    @SuperProp({
        type: String,
    })
    responseCode: string;

    @SuperProp({
        type: String,
    })
    transactionNo: string;

    @SuperProp({
        type: String,
    })
    transactionStatus: string;

    @SuperProp({
        type: String,
    })
    secureHash: string;

    @SuperProp({
        type: String,
    })
    status: string;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.USER,
        refClass: User,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.USER,
    })
    createdBy: Types.ObjectId;
}
export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.plugin(autopopulateSoftDelete);
