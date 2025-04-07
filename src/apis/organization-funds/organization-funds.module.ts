import { Module } from '@nestjs/common';
import { OrganizationFundsService } from './organization-funds.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    OrganizationFund,
    OrganizationFundSchema,
} from './entities/organization-funds.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.ORGANIZATION_FUND,
                schema: OrganizationFundSchema,
                entity: OrganizationFund,
            },
        ]),
    ],
    providers: [OrganizationFundsService],
    exports: [OrganizationFundsService],
})
export class OrganizationFundsModule {}
