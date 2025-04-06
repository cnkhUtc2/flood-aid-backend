import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Donation } from 'src/apis/donations/entities/donation.entity';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.FUND_DONATION,
})
export class FundDonation {
    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.DONATION,
        refClass: Donation,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.DONATION,
    })
    donation: Types.ObjectId;

    @SuperProp({
        type: Date,
        required: true,
    })
    donationDate: Date;
}

export type FundDonationDocument = FundDonation & Document;
export const FundDonationSchema = SchemaFactory.createForClass(FundDonation);
FundDonationSchema.plugin(autopopulateSoftDelete);
