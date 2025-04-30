import { Body, Controller, Query } from '@nestjs/common';
import { ReliefCasesService } from '../relief-cases.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { COLLECTION_NAMES } from 'src/constants';
import { SuperDelete, SuperGet, SuperPost } from '@libs/super-core';
import { CreateReliefCaseDto } from '../dto/create-relief-case.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { Types } from 'mongoose';
import { ParseObjectIdArrayPipe } from 'src/pipes/parse-object-ids.pipe';

@Controller('relief-cases')
@Resource('relief-cases')
@ApiTags('Front: ReliefCases')
@AuditLog({
    events: [AUDIT_EVENT.POST, AUDIT_EVENT.PUT, AUDIT_EVENT.DELETE],
    refSource: COLLECTION_NAMES.FILE,
})
export class ReliefCasesController {
    constructor(private readonly reliefCasesService: ReliefCasesService) {}

    @SuperGet({ route: '/' })
    @SuperAuthorize(PERMISSION.GET)
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.reliefCasesService.getAll(queryParams);
        return result;
    }

    @SuperPost({ route: 'create', dto: CreateReliefCaseDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(
        @Me() user: UserPayload,
        @Body() ticket: CreateReliefCaseDto,
    ) {
        return this.reliefCasesService.createOne(ticket, user);
    }
}
