import {
    Body,
    Controller,
    Param,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { SupportTicketService } from '../ticket.service';
import { CreateSupportTicketDto } from '../dto/create-support-ticket.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
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
import { UpdateSupportTicketDto } from '../dto/update-support-ticket.dto';
import { Types } from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';

@Controller('tickets')
@Resource('tickets')
@ApiTags('Admin: Tickets')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.FILE,
})
export class SupportTicketControllerAdmin {
    constructor(private readonly ticketService: SupportTicketService) {}

    @SuperGet({ route: '/' })
    @SuperAuthorize(PERMISSION.GET)
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
        options?: Record<string, any>,
    ) {
        const result = await this.ticketService.getAll(queryParams, options);
        return result;
    }

    @SuperGet({ route: ':id' })
    @SuperAuthorize(PERMISSION.GET)
    async getOne(@Param('id') id: string) {
        const result = await this.ticketService.getOne(new Types.ObjectId(id));
        return result;
    }

    @SuperPost({ route: 'create', dto: CreateSupportTicketDto })
    @SuperAuthorize(PERMISSION.POST)
    @UseInterceptors(FilesInterceptor('attachments'))
    async createOne(
        @Me() user: UserPayload,
        @Body() ticket: CreateSupportTicketDto,
        @UploadedFiles() attachments: IUploadedMulterFile[],
    ) {
        return this.ticketService.createOne(ticket, user, attachments);
    }

    @SuperPut({ route: 'update/:id', dto: UpdateSupportTicketDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateOne(
        @Param('id') id: string,
        @Me() user: UserPayload,
        @Body() ticket: UpdateSupportTicketDto,
    ) {
        return this.ticketService.updateOneById(
            new Types.ObjectId(id),
            ticket,
            user,
        );
    }
}
