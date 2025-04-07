import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.DONATION,
})
export class Donation {
    @SuperProp({
        type: String,
        required: true,
    })
    title: string;

    @SuperProp({
        type: String,
        required: true,
    })
    description: string;

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
        type: Date,
        required: true,
    })
    donationDate: Date;

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
