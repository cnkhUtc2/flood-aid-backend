import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { OrganizationFundDocument } from './entities/organization-funds.entity';
import { BaseService } from 'src/base/service/base.service';
import { Types } from 'mongoose';

@Injectable()
export class OrganizationFundsService extends BaseService<OrganizationFundDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.ORGANIZATION_FUND)
        private readonly organizationFundModel: ExtendedModel<OrganizationFundDocument>,
    ) {
        super(organizationFundModel);
    }

    async upadteOne(id: string, amount: number) {
        const organizationFund = await this.organizationFundModel
            .findById(new Types.ObjectId(id))
            .exec();

        const result = await this.organizationFundModel.findByIdAndUpdate(
            new Types.ObjectId(id),
            {
                currentAmount: organizationFund.currentAmount + amount,
            },
        );

        return result;
    }
}
