import { Body, Controller, Query, UseGuards } from '@nestjs/common';
import { SupportTicketService } from '../ticket.service';
import { CreateSupportTicketDto } from '../dto/create-support-ticket.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { SuperGet, SuperPost } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { Me } from 'src/decorators/me.decorator';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { COLLECTION_NAMES } from 'src/constants';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';

@Controller('tickets')
@Resource('tickets')
@ApiTags('Front: Tickets')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.FILE,
})
export class SupportTicketController {
    constructor(private readonly ticketService: SupportTicketService) {}

    @SuperGet({ route: '/' })
    @SuperAuthorize(PERMISSION.GET)
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.ticketService.getAll(queryParams);
        return result;
    }

    @SuperPost({ route: 'create', dto: CreateSupportTicketDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(
        @Me() user: UserPayload,
        @Body() ticket: CreateSupportTicketDto,
    ) {
        return this.ticketService.createOne(ticket, user);
    }
}
