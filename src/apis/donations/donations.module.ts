import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Donation, DonationSchema } from './entities/donation.entity';
import { OrganizationFundsModule } from '../organization-funds/organization-funds.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.DONATION,
                schema: DonationSchema,
                entity: Donation,
            },
        ]),
        OrganizationFundsModule,
    ],
    providers: [DonationsService],
    exports: [DonationsService],
})
export class DonationsModule {}
