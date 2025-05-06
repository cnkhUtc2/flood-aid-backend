import { Body, Controller, Param, Query } from '@nestjs/common';
import { ReliefCasesService } from '../relief-cases.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { AuditLog } from 'src/packages/audits/decorators/audits.decorator';
import { AUDIT_EVENT } from 'src/packages/audits/constants';
import { COLLECTION_NAMES } from 'src/constants';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { CreateReliefCaseDto } from '../dto/create-relief-case.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { Types } from 'mongoose';
import { UpdateReliefCaseDto } from '../dto/update-relief-case.dto';

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
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.reliefCasesService.getAll(queryParams);
        return result;
    }

    @SuperGet({ route: ':id' })
    async getOne(@Param('id') id: string) {
        const result = await this.reliefCasesService.getOne(
            new Types.ObjectId(id),
        );
        return result;
    }

    @SuperPut({ route: 'update/:id', dto: UpdateReliefCaseDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateOne(
        @Param('id') id: string,
        @Me() user: UserPayload,
        @Body() ticket: UpdateReliefCaseDto,
    ) {
        const result = await this.reliefCasesService.updateOneById(
            new Types.ObjectId(id),
            ticket,
            user,
        );
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
