import { Module } from '@nestjs/common';
import { OrganizationFundsService } from './organization-funds.service';
import { OrganizationFundsController } from './controllers/organization-funds.controller';

@Module({
    controllers: [],
    providers: [OrganizationFundsService],
    exports: [OrganizationFundsService],
})
export class OrganizationFundsModule {}
