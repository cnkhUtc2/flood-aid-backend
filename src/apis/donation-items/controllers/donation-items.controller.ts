import { Body, Controller, Param, Query } from '@nestjs/common';
import { DonationItemsService } from '../donation-items.service';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { CreateDonationItemDto } from '../dto/create-donation-item.dto';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { UpdateDonationItemDto } from '../dto/update-donation-item.dto';
import { Types } from 'mongoose';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';

@Controller('donation-items')
@Resource('donation-items')
@ApiTags('Front: Donation Items')
export class DonationItemsController {
    constructor(private readonly donationItemsService: DonationItemsService) {}

    @SuperGet({ route: '/' })
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
}
