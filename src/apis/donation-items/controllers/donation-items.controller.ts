import { Body, Controller, Param, Query } from '@nestjs/common';
import { DonationItemsService } from '../donation-items.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuperDelete, SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { CreateDonationItemDto } from '../dto/create-donation-item.dto';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { UpdateDonationItemDto } from '../dto/update-donation-item.dto';
import { Types } from 'mongoose';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { ParseObjectIdArrayPipe } from 'src/pipes/parse-object-ids.pipe';

@Controller('donation-items')
@Resource('donation-items')
@ApiTags('Front: Donation Items')
export class DonationItemsController {
    constructor(private readonly donationItemsService: DonationItemsService) {}

    @SuperGet({ route: '/' })
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.donationItemsService.getAll(queryParams);
        return result;
    }

    @SuperGet({ route: ':id' })
    async getOne(@Param('id') id: string) {
        const result = await this.donationItemsService.getOne(
            new Types.ObjectId(id),
        );

        const { message, ...rest } = result;
        return rest;
    }

    @SuperPost({ route: 'create', dto: CreateDonationItemDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(
        @Body() donationItem: CreateDonationItemDto,
        @Me() user: UserPayload,
    ) {
        const result = await this.donationItemsService.createOne(
            donationItem,
            user,
        );
        return result._id;
    }

    @SuperDelete()
    @SuperAuthorize(PERMISSION.DELETE)
    @ApiQuery({ name: 'ids', type: [String] })
    async deletes(
        @Query('ids', ParseObjectIdArrayPipe) _ids: Types.ObjectId[],
        @Me() user: UserPayload,
    ) {
        const result = await this.donationItemsService.deletes(_ids, user);
        return result;
    }
}
