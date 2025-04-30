import { SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import { UserStatus } from '../constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { AutoPopulate } from '@libs/super-search';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { SuperProp } from '@libs/super-core';
import {
    Role,
    RoleDocument,
} from '@libs/super-authorize/modules/roles/entities/roles.entity';
import { Profile } from 'src/apis/profiles/entities/profile.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.USER,
})
export class User extends AggregateRoot {
    @SuperProp({
        type: String,
        required: false,
        default: 'No Name',
        cms: {
            label: 'Name',
            tableShow: true,
            index: true,
            columnPosition: 1,
        },
    })
    name: string;

    @SuperProp({
        type: String,
        required: false,
        cms: {
            label: 'Email',
            tableShow: true,
            columnPosition: 2,
        },
    })
    email: string;

    @SuperProp({
        type: Types.ObjectId,
        required: false,
        ref: COLLECTION_NAMES.ROLE,
        refClass: Role,
        cms: {
            label: 'Role',
            tableShow: true,
            columnPosition: 7,
        },
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.ROLE,
    })
    role: Types.ObjectId | RoleDocument;

    @SuperProp({
        type: String,
        enum: UserStatus,
        default: UserStatus.ACTIVE,
        cms: {
            label: 'Status',
            tableShow: true,
            columnPosition: 8,
        },
    })
    status: UserStatus;

    @SuperProp({
        autoPopulateExclude: true,
        type: String,
        required: false,
    })
    password: string;

    @SuperProp({
        type: String,
        cms: {
            label: 'Invite Code',
            tableShow: true,
            columnPosition: 9,
        },
    })
    inviteCode: string;

    @SuperProp({
        type: [Types.ObjectId],
        ref: COLLECTION_NAMES.USER,
        refClass: User,
        required: false,
        cms: {
            label: 'friends',
            tableShow: true,
            columnPosition: 98,
        },
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.USER,
    })
    friends: Types.ObjectId[];

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.PROFILE,
        refClass: Profile,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.PROFILE,
    })
    profile: Types.ObjectId;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.USER,
        refClass: User,
        cms: {
            label: 'Created By',
            tableShow: true,
            columnPosition: 99,
        },
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.USER,
    })
    createdBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(autopopulateSoftDelete);
