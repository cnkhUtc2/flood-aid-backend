import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Module({
    controllers: [],
    providers: [DonationsService],
    exports: [DonationsService],
})
export class DonationsModule {}
