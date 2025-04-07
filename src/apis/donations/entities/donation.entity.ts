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
    collection: COLLECTION_NAMES.DONATION,
})
export class Donation extends AggregateRoot {
    @SuperProp({
        type: String,
        required: false,
    })
    title: string;

    @SuperProp({
        type: String,
        required: false,
    })
    message: string;

    @SuperProp({
        type: String,
        required: true,
        enum: ['FUND', 'CASE'],
    })
    type: string;

    @SuperProp({
        type: Number,
        required: true,
    })
    amount: number;

    @SuperProp({
        type: [String],
        default: [],
        required: false,
    })
    items: string[];

    @SuperProp({
        type: String,
        required: true,
    })
    donorName: string;

    @SuperProp({
        type: Number,
        required: false,
    })
    cardLast4digits: number;

    @SuperProp({
        type: String,
        required: false,
    })
    paymentMethod: string;

    @SuperProp({
        type: String,
        required: true,
    })
    currency: string;

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

export type DonationDocument = Donation & Document;
export const DonationSchema = SchemaFactory.createForClass(Donation);
DonationSchema.plugin(autopopulateSoftDelete);
