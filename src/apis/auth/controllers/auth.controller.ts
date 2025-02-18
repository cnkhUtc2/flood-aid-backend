import { Body, Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { COLLECTION_NAMES } from 'src/constants';
import { AuthService } from '../auth.service';
import { Resource } from '@libs/super-authorize';
import { SuperPost } from '@libs/super-core';
import { UserLoginDto } from '../dto/user-login.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { CreateUserDto } from 'src/apis/users/dto/create-user.dto';

@Controller()
@Resource()
@ApiTags('Front: Auth')
@AuditLog({
    events: [
        AUDIT_EVENT.GET,
        AUDIT_EVENT.POST,
        AUDIT_EVENT.PUT,
        AUDIT_EVENT.DELETE,
    ],
    refSource: COLLECTION_NAMES.NONCE,
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @SuperPost({ route: 'login', dto: UserLoginDto })
    @UseGuards(LocalAuthGuard)
    async login(@Me() user: UserPayload) {
        if (!user) {
            return undefined;
        }
        return await this.authService.login(user);
    }

    @SuperPost({ route: 'register', dto: CreateUserDto })
    async register(@Body() userRegisterDto: CreateUserDto) {
        return await this.authService.register(userRegisterDto);
    }
}
