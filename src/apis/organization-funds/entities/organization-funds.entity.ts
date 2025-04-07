import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { extend } from 'lodash';
import { Document, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.ORGANIZATION_FUND,
})
export class OrganizationFund extends AggregateRoot {
    @SuperProp({
        type: String,
        required: true,
    })
    name: string;

    @SuperProp({
        type: String,
        required: false,
    })
    description: string;

    @SuperProp({
        type: Number,
        required: false,
    })
    goalAmount: number;

    @SuperProp({
        type: Number,
        required: false,
        default: 0,
    })
    currentAmount: number;

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

export type OrganizationFundDocument = OrganizationFund & Document;
export const OrganizationFundSchema =
    SchemaFactory.createForClass(OrganizationFund);
OrganizationFundSchema.plugin(autopopulateSoftDelete);
