import { Controller } from '@nestjs/common';
import { OrganizationFundsService } from '../organization-funds.service';

@Controller('organization-funds')
export class OrganizationFundsController {
    constructor(
        private readonly organizationFundsService: OrganizationFundsService,
    ) {}
}
