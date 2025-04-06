import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './controllers/donations.controller';

@Module({
    controllers: [],
    providers: [DonationsService],
    exports: [DonationsService],
})
export class DonationsModule {}
