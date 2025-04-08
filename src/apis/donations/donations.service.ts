import { ExtendedInjectModel } from '@libs/super-core';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { COLLECTION_NAMES } from 'src/constants';
import { DonationDocument } from './entities/donation.entity';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { CreateDonationDto } from './dto/create-donation.dto';
import { OrganizationFundsService } from '../organization-funds/organization-funds.service';

@Injectable()
export class DonationsService extends BaseService<DonationDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.DONATION)
        private readonly donationModel: ExtendedModel<DonationDocument>,
        private readonly organizationFundService: OrganizationFundsService,
    ) {
        super(donationModel);
    }

    async createOne(donation: CreateDonationDto) {
        const newDonation = await this.donationModel.create(donation);

        await this.organizationFundService.upadteOne(
            '60d23f5c9b12a83e8c8f1234',
            newDonation.amount,
        );

        return newDonation;
    }
}
