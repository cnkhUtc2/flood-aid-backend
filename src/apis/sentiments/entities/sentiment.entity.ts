import { SuperProp } from '@libs/super-core';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.SENTIMENT,
})
export class Sentiment extends AggregateRoot {
    @SuperProp({
        type: Number,
        required: true,
    })
    positive: number;

    @SuperProp({
        type: Number,
        required: true,
    })
    negative: number;

    @SuperProp({
        type: Number,
        required: true,
    })
    neutral: number;

    @SuperProp({
        type: String,
        enum: ['POST', 'COMMENT'],
    })
    type: string;
}

export type SentimentDocument = Sentiment & Document;
export const SentimentSchema = SchemaFactory.createForClass(Sentiment);
SentimentSchema.plugin(autopopulateSoftDelete);
