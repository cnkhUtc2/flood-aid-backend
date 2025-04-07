import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.ORGANIZATION_FUND,
})
export class OrganizationFunds {
    @SuperProp({
        type: String,
        required: true,
    })
    name: string;

    @SuperProp({
        type: String,
        required: true,
    })
    description: string;

    @SuperProp({
        type: Number,
        required: true,
    })
    goalAmount: number;

    @SuperProp({
        type: Number,
        default: 0,
    })
    currentAmount: number;
}

export type OrganizationFundDocument = OrganizationFunds & Document;
export const OrganizationFundSchema =
    SchemaFactory.createForClass(OrganizationFunds);
OrganizationFundSchema.plugin(autopopulateSoftDelete);
