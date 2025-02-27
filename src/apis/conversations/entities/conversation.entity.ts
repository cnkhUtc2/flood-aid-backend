import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Aggregate, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.CONVERSATION,
})
export class Conversation extends AggregateRoot {
    @SuperProp({
        type: [Types.ObjectId],
        ref: COLLECTION_NAMES.USER,
        refClass: User,
    })
    // @AutoPopulate({
    //     ref: COLLECTION_NAMES.USER,
    // })
    members: [Types.ObjectId];
}
export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.plugin(autopopulateSoftDelete);
