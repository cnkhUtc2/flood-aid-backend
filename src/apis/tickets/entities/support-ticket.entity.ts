import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from 'src/apis/media/entities/files.entity';
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
        required: false,
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
        required: false,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
    })
    priority: string;

    @SuperProp({
        type: Boolean,
        required: false,
    })
    isCreatedReliefCase: boolean;

    @SuperProp({
        type: String,
        required: true,
        enum: ['OPEN', 'ACCEPTED', 'DECLINED'],
    })
    status: string;

    @SuperProp({
        type: String,
    })
    city: string;

    @SuperProp({
        type: String,
    })
    province: string;

    @SuperProp({
        type: String,
    })
    ward: string;

    @SuperProp({
        type: String,
    })
    address: string;

    @SuperProp({
        type: [Types.ObjectId],
        ref: COLLECTION_NAMES.FILE,
        refClass: File,
        required: false,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.FILE,
        isArray: true,
    })
    attachments: Types.ObjectId[];

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
