import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SupportTicket } from 'src/apis/tickets/entities/support-ticket.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.RELIEF_CASE,
})
export class ReliefCase extends AggregateRoot {
    @SuperProp({
        type: String,
        required: true,
    })
    caseName: string;

    @SuperProp({
        type: String,
        required: true,
    })
    description: string;

    @SuperProp({
        type: String,
        required: true,
    })
    location: string;

    @SuperProp({
        type: String,
        required: true,
        enum: ['ACTIVE', 'CLOSED'],
        default: 'ACTIVE',
    })
    status: string;

    @SuperProp({
        type: Date,
        required: true,
    })
    startDate: Date;

    @SuperProp({
        type: Date,
    })
    endDate: Date;

    // @SuperProp({
    //     type: [String],
    //     default: [],
    // })
    // mediaLinks: string[];

    @SuperProp({
        type: Number,
        default: 0,
    })
    totalDonations: number;

    @SuperProp({
        type: String,
    })
    contactEmail: string;

    @SuperProp({
        type: String,
    })
    contactPhone: string;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.SUPPORT_TICKET,
        refClass: SupportTicket,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.SUPPORT_TICKET,
    })
    supportTicket: Types.ObjectId;

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

export type ReliefCaseDocument = ReliefCase & Document;
export const ReliefCaseSchema = SchemaFactory.createForClass(ReliefCase);
ReliefCaseSchema.plugin(autopopulateSoftDelete);
