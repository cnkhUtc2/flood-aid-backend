import { Controller } from '@nestjs/common';
import { OrganizationFundsService } from 'src/apis/organization-funds/organization-funds.service';

@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationFundsService,
    ) {}
}
