import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { ProfileDocument } from './entities/profile.entity';
import { BaseService } from 'src/base/service/base.service';
import { Types } from 'mongoose';

@Injectable()
export class ProfilesService extends BaseService<ProfileDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.PROFILE)
        private readonly profileModel: ExtendedModel<ProfileDocument>,
    ) {
        super(profileModel);
    }

    async createOne(userId: Types.ObjectId) {
        const newUser = await this.profileModel.create({
            createdBy: new Types.ObjectId(userId),
        });
        return newUser;
    }
}
