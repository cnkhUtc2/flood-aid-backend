import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { Item } from './item.entity';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.DONATION_ITEM,
})
export class DonationItem extends AggregateRoot {
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
        default: 'FUND',
    })
    type: string;

    @SuperProp({
        type: [Types.ObjectId],
        ref: COLLECTION_NAMES.ITEM,
        refClass: Item,
        default: [],
        required: false,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.ITEM,
        isArray: true,
    })
    items: Item[];

    @SuperProp({
        type: String,
        required: true,
        enum: ['open', 'accepted', 'declined'],
        default: 'open',
    })
    status: string;

    @SuperProp({
        type: String,
        required: true,
    })
    donorName: string;

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

export type DonationItemDocument = DonationItem & Document;
export const DonationItemSchema = SchemaFactory.createForClass(DonationItem);
DonationItemSchema.plugin(autopopulateSoftDelete);
