import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { OrganizationFundDocument } from './entities/organization-funds.entity';
import { BaseService } from 'src/base/service/base.service';

@Injectable()
export class OrganizationFundsService extends BaseService<OrganizationFundDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.ORGANIZATION_FUND)
        private readonly organizationFundModel: ExtendedModel<OrganizationFundDocument>,
    ) {
        super(organizationFundModel);
    }
}
