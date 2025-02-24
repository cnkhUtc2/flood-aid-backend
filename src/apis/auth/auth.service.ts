import { BadRequestException, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/base/models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { appSettings } from 'src/configs/app-settings';
import { UserService } from '../users/user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Types } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async login(user: UserPayload) {
        const tokens = await this.getTokens(user);
        return tokens;
    }

    async register(dto: CreateUserDto, createdByUser?: UserPayload) {
        const existingUser = await this.userService.getOne(dto.email);
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const newUser = await this.userService.createOne(dto, createdByUser);
        return newUser;
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
