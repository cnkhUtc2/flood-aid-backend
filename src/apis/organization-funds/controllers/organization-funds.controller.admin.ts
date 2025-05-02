import { Body, Controller, Param } from '@nestjs/common';
import { OrganizationFundsService } from '../organization-funds.service';
import { Types } from 'mongoose';
import { UpdateOrganizationFundDto } from '../dto/update-organization-fund.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { SuperGet, SuperPut } from '@libs/super-core';

@Controller('funds')
@Resource('funds')
@ApiTags('Admin: Funds')
export class OrganizationFundsControllerAdmin {
    constructor(
        private readonly organizationFundsService: OrganizationFundsService,
    ) {}

    @SuperGet({ route: '' })
    @SuperAuthorize(PERMISSION.GET)
    async getOne() {
        const result = await this.organizationFundsService.getOne(
            new Types.ObjectId('60d23f5c9b12a83e8c8f1234'),
        );
        return result;
    }

    @SuperPut({ route: 'update/:id', dto: UpdateOrganizationFundDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateOne(
        @Param('id') id: string,
        @Body() fund: UpdateOrganizationFundDto,
        @Me() user: UserPayload,
    ) {
        const result = await this.organizationFundsService.updateOneById(
            new Types.ObjectId(id),
            fund,
            user,
        );
        return result;
    }
}
