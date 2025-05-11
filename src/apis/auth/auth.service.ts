import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserPayload } from 'src/base/models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { appSettings } from 'src/configs/app-settings';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { CheckPasswordDto } from './dto/checkPassword.dto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const client = new OAuth2Client(appSettings.google.clientId);

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

    async handleGoogleLogin(idToken: string) {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new UnauthorizedException('Invalid Google token');
        }

        let user = await this.userService.getOne({
            email: payload.email,
        });

        if (!user) {
            const randomPassword = uuidv4();

            user = await this.userService.model.create({
                email: payload.email,
                name: payload.name || 'unknown',
                password: randomPassword,
                role: '667b7b83462a35d0fbe5d251',
            });
            const newProfile = await this.profileService.createOne(user._id);
            user.profile = newProfile._id;
            await user.save();
        }

        const token = await this.getTokens({
            _id: new Types.ObjectId(user?._id),
            email: payload?.email || 'unknown',
            name: payload?.name || 'unknown',
            roleId: new Types.ObjectId('667b7b83462a35d0fbe5d251'),
        });

        return token;
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
