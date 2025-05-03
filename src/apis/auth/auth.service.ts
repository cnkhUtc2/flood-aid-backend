import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserPayload } from 'src/base/models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { appSettings } from 'src/configs/app-settings';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { CheckPasswordDto } from './dto/checkPassword.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly profileService: ProfilesService,
    ) {}

    async login(user: UserPayload) {
        const tokens = await this.getTokens(user);
        return tokens;
    }

    async register(dto: CreateUserDto, createdByUser?: UserPayload) {
        const existingUser = await this.userService.getOne({
            email: dto.email,
        });
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const newUser = await this.userService.createOne(dto, createdByUser);
        const newProfile = await this.profileService.createOne(newUser._id);
        newUser.profile = newProfile._id;
        await newUser.save();

        return newUser;
    }

    async checkPassword(passwordDto: CheckPasswordDto) {
        const existingUser = await this.userService.model
            .findById(new Types.ObjectId(passwordDto.id))
            .exec();

        const isMatch = await bcrypt.compare(
            passwordDto.password,
            existingUser.password,
        );
        if (!isMatch) {
            throw new BadRequestException('Invalid password');
        }

        return existingUser;
    }

    private async getTokens(user: UserPayload) {
        const { _id } = user;

        const [refreshToken, accessToken] = await Promise.all([
            this.jwtService.signAsync(
                { _id },
                {
                    expiresIn: appSettings.jwt.refreshExpireIn,
                    secret: appSettings.jwt.refreshSecret,
                },
            ),
            this.jwtService.signAsync(user),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
