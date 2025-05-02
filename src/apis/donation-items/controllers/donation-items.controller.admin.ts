import { Body, Controller, Param, Query } from '@nestjs/common';
import { DonationItemsService } from '../donation-items.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuperDelete, SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { UpdateDonationItemDto } from '../dto/update-donation-item.dto';
import { Types } from 'mongoose';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { CreateDonationItemDto } from '../dto/create-donation-item.dto';
import { ParseObjectIdArrayPipe } from 'src/pipes/parse-object-ids.pipe';

@Controller('donation-items')
@Resource('donation-items')
@ApiTags('Admin: Donation Items')
export class DonationItemsControllerAdmin {
    constructor(private readonly donationItemsService: DonationItemsService) {}

    @SuperGet()
    @SuperAuthorize(PERMISSION.GET)
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.donationItemsService.getAll(queryParams);
        return result;
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
        return result;
    }

    @SuperPut({ route: 'update/:id', dto: UpdateDonationItemDto })
    @SuperAuthorize(PERMISSION.POST)
    async uodateOne(
        @Param('id') id: string,
        @Body() donationItem: UpdateDonationItemDto,
        @Me() user: UserPayload,
    ) {
        await this.donationItemsService.updateOne(
            new Types.ObjectId(id),
            donationItem,
            user,
        );
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
