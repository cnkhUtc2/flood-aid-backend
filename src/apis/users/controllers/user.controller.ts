import { Body, Controller, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/base/models/user-payload.model';
import { COLLECTION_NAMES } from 'src/constants';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { UpdateMeDto } from '../dto/update-me.dto';
import { UserService } from '../user.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { Me } from 'src/decorators/me.decorator';
import { AddFriendDto } from '../dto/add-friend.dto,';
import { UpdateProfileDto } from 'src/apis/profiles/dto/update-profile.dto';
import { Types } from 'mongoose';
import { ProfilesService } from 'src/apis/profiles/profiles.service';

@Controller('users')
@Resource('users')
@ApiTags('Front: User')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.FILE,
})
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfilesService,
    ) {}

    @SuperGet({ route: 'me' })
    @SuperAuthorize(PERMISSION.GET)
    async getMe(@Me() user: UserPayload) {
        const result = await this.userService.getMe(user);
        return result;
    }

    @SuperGet({ route: 'get/:id' })
    @SuperAuthorize(PERMISSION.GET)
    async getById(@Param('id') id: string) {
        const result = await this.userService.getById(id);
        return result;
    }

    @SuperPost({ route: 'add-friend', dto: AddFriendDto })
    @SuperAuthorize(PERMISSION.POST)
    async addFriend(
        @Body() addFriendDto: AddFriendDto,
        @Me() user: UserPayload,
    ) {
        return this.userService.addFriend(addFriendDto, user);
    }

    @SuperPut({ route: 'update-profile/:id', dto: UpdateProfileDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateProfile(
        @Param('id') userId: string,
        @Body() profile: UpdateProfileDto,
        @Me() user: UserPayload,
    ) {
        const existingUser = await this.userService.getOne({
            _id: new Types.ObjectId(userId),
        });
        const updatedProfile = await this.profileService.updateOneById(
            existingUser.profile,
            profile,
            user,
        );

        return updatedProfile;
    }

    @SuperPut({ route: 'me', dto: UpdateMeDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateMe(@Body() updateMeDto: UpdateMeDto, @Me() user: UserPayload) {
        return this.userService.updateMe(user, updateMeDto);
    }
}
