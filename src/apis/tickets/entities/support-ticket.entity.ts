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
    collection: COLLECTION_NAMES.SUPPORT_TICKET,
})
export class SupportTicket extends AggregateRoot {
    @SuperProp({
        type: String,
        required: true,
    })
    title: string;

    @SuperProp({
        type: String,
        required: true,
    })
    purpose: string;

    @SuperProp({
        type: String,
        required: true,
    })
    description: string;

    @SuperProp({
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
    })
    priority: string;

    @SuperProp({
        type: String,
        required: true,
        enum: ['open', 'in_progress', 'resolved'],
    })
    status: string;

    @SuperProp({
        type: String,
    })
    location: string;

    // @SuperProp({
    //     type: [String],
    //     default: [],
    // })
    // attachments: string[];

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

export type SupportTicketDocument = SupportTicket & Document;
export const SupportTicketSchema = SchemaFactory.createForClass(SupportTicket);
SupportTicketSchema.plugin(autopopulateSoftDelete);
