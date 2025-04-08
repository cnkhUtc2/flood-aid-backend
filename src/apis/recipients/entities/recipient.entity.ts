import { SuperProp } from '@libs/super-core';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.RECIPIENT,
})
export class Recipient extends AggregateRoot {
    @SuperProp({ type: String })
    email: string;

    @SuperProp({ type: String, enum: ['express', 'custom', 'standard'] })
    type: string;

    @SuperProp({ type: String, required: true })
    stripeAccountId: string;

    @SuperProp({ type: Boolean, default: false })
    onboardingCompleted: boolean;

    @SuperProp({ type: Boolean, default: false })
    chargesEnabled: boolean;

    @SuperProp({ type: Boolean, default: false })
    payoutsEnabled: boolean;

    @SuperProp({ type: String })
    country: string;
}

export type RecipientDocument = Recipient & Document;
export const RecipientSchema = SchemaFactory.createForClass(Recipient);
RecipientSchema.plugin(autopopulateSoftDelete);
