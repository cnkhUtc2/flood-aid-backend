import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Donation } from 'src/apis/donations/entities/donation.entity';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.CASE_DONATION,
})
export class CaseDonation {
    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.DONATION,
        refClass: Donation,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.DONATION,
    })
    donation: Types.ObjectId;

    // @SuperProp({
    //     type: Types.ObjectId,
    //     ref: COLLECTION_NAMES.PERSON,
    //     refClass: Person,
    // })
    // @AutoPopulate({
    //     ref: COLLECTION_NAMES.PERSON,
    // })
    // person: Types.ObjectId;

    @SuperProp({
        type: [String],
        default: [],
    })
    items: string[];
}

export type CaseDonationDocument = CaseDonation & Document;
export const CaseDonationSchema = SchemaFactory.createForClass(CaseDonation);
CaseDonationSchema.plugin(autopopulateSoftDelete);
