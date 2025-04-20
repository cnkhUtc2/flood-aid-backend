import { Body, Controller } from '@nestjs/common';
import { DonationsService } from '../donations.service';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { SuperPost } from '@libs/super-core';

@Controller('donations')
@Resource('donations')
@ApiTags('Admin: Donation')
export class DonationsControllerAdmin {
    constructor(private readonly donationsService: DonationsService) {}

    @SuperPost({ route: 'create', dto: CreateDonationDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(@Body() donation: CreateDonationDto) {
        const result = await this.donationsService.createOne(donation);
        return result;
    }
}
