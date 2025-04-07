import { Body, Controller } from '@nestjs/common';
import { DonationsService } from '../donations.service';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { SuperPost } from '@libs/super-core';

@Controller('donations')
@Resource('donations')
@ApiTags('Front: Donation')
export class DonationsController {
    constructor(private readonly donationsService: DonationsService) {}

    @SuperPost({ route: 'create', dto: CreateDonationDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(@Body() donation: CreateDonationDto) {
        const result = await this.donationsService.createOne(donation);
        return result;
    }
}
