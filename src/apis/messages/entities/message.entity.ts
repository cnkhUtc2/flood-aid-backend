import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Aggregate, Types } from 'mongoose';
import { Conversation } from 'src/apis/conversations/entities/conversation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.MESSAGE,
})
export class Message extends AggregateRoot {
    @SuperProp({
        type: String,
        required: true,
    })
    text: string;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.USER,
        refClass: User,
        required: true,
    })
    sender: Types.ObjectId;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.CONVERSATION,
        refClass: Conversation,
        required: true,
    })
    conversation: Conversation;
}
export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.plugin(autopopulateSoftDelete);
