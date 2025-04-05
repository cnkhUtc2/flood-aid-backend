import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Type } from '@nestjs/common';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.PROFILE,
})
export class Profile extends AggregateRoot {
    @SuperProp({
        type: String,
        required: false,
    })
    firstName: string;

    @SuperProp({
        type: String,
        required: false,
    })
    lastName: string;

    @SuperProp({
        type: String,
        required: false,
    })
    phone: string;

    @SuperProp({
        type: String,
        required: false,
    })
    address: string;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.FILE,
        refClass: File,
        required: false,
        cms: {
            label: 'Avatar',
            tableShow: true,
            columnPosition: 5,
        },
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.FILE,
    })
    avatar: Types.ObjectId;

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
export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(autopopulateSoftDelete);
