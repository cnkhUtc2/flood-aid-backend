import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './controllers/organization.controller';

@Module({
    controllers: [],
    providers: [OrganizationService],
    exports: [OrganizationService],
})
export class OrganizationModule {}
