import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConversationService } from '../conversation.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { Resource } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { COLLECTION_NAMES } from 'src/constants';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { SuperGet, SuperPost } from '@libs/super-core';
import { PagingDto } from 'src/base/dto/paging.dto';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';

@Controller('conversations')
@Resource('conversations')
@ApiTags('Front: Conversation')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.FILE,
})
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @SuperGet({ route: '/' })
    async getALl(@Query(new PagingDtoPipe()) queryParams: ExtendedPagingDto) {
        return await this.conversationService.getAll(queryParams);
    }

    @SuperGet({ route: '/:id' })
    async getOne(@Param('id') id: string) {
        return await this.conversationService.getByUserId(id);
    }

    @SuperPost({ route: 'me', dto: CreateConversationDto })
    async createOne(@Body() dto: CreateConversationDto) {
        return await this.conversationService.creatOne(dto);
    }
}
