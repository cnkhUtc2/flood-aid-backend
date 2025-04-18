import { Body, Controller, Param } from '@nestjs/common';
import { OrganizationFundsService } from '../organization-funds.service';
import { Types } from 'mongoose';
import { UpdateOrganizationFundDto } from '../dto/update-organization-fund.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { SuperPut } from '@libs/super-core';

@Controller('tickets')
@Resource('tickets')
@ApiTags('Front: Tickets')
export class OrganizationFundsController {
    constructor(
        private readonly organizationFundsService: OrganizationFundsService,
    ) {}

    // @SuperPost({ route: 'create', dto: CreateOrganizationFundDto })
    // @SuperAuthorize(PERMISSION.POST)
    // async createOne(
    //     @Body() fund: CreateOrganizationFundDto,
    //     @Me() user: UserPayload,
    // ) {
    //     const result = await this.organizationFundsService.createOne(
    //         fund,
    //         user,
    //     );
    //     return result;
    // }

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
