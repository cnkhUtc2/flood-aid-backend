import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.COMMENT,
})
export class Comment extends AggregateRoot {
    @SuperProp({
        type: String,
        required: false,
    })
    content: string;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.COMMENT,
        refClass: Comment,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.COMMENT,
    })
    parent: Types.ObjectId;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.POST,
        refClass: Post,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.POST,
    })
    post: Types.ObjectId;

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

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.plugin(autopopulateSoftDelete);
