import { Resource } from '@libs/super-authorize';
import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { COLLECTION_NAMES } from 'src/constants';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { MessageService } from '../message.service';
import { SuperGet, SuperPost } from '@libs/super-core';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';

@Controller('messages')
@Resource('messages')
@ApiTags('Front: Message')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.MESSAGE,
})
export class MessageController {
    constructor(private messageService: MessageService) {}
    @SuperPost({ route: '/create', dto: CreateMessageDto })
    async createOne(
        @Body() dto: CreateMessageDto,
        @Me() userPayload: UserPayload,
    ) {
        return await this.messageService.create(dto, userPayload);
    }

    @SuperGet({ route: '/:id' })
    async getById(@Param() id: string) {
        return await this.messageService.getById(id);
    }
}
