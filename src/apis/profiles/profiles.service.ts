import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { ProfileDocument } from './entities/profile.entity';
import { BaseService } from 'src/base/service/base.service';
import { Types } from 'mongoose';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { UserPayload } from 'src/base/models/user-payload.model';
import { MediaService } from '../media/medias.service';

@Injectable()
export class ProfilesService extends BaseService<ProfileDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.PROFILE)
        private readonly profileModel: ExtendedModel<ProfileDocument>,
        private readonly mediaService: MediaService,
    ) {
        super(profileModel);
    }

    async createOne(userId: Types.ObjectId) {
        const newUser = await this.profileModel.create({
            createdBy: new Types.ObjectId(userId),
        });
        return newUser;
    }

    async uploadAvatar(avatar: IUploadedMulterFile, user: UserPayload) {
        if (!avatar) return new BadRequestException('Avatar null');
        const newAvatarFile = await this.mediaService.createFile(
            avatar,
            user,
            'avatars',
        );

        const existingProfile = await this.profileModel
            .findOne({
                createdBy: new Types.ObjectId(user._id),
            })
            .exec();

        if (!existingProfile) {
            throw new BadRequestException('Profile not found');
        }

        existingProfile.avatar = newAvatarFile._id;

        await this.profileModel.findByIdAndUpdate(
            new Types.ObjectId(existingProfile._id),
            { avatar: new Types.ObjectId(newAvatarFile._id) },
        );

        return newAvatarFile;
    }
}
