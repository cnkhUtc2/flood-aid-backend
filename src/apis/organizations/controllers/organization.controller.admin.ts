import { Resource } from '@libs/super-authorize';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationFundsService } from 'src/apis/organization-funds/organization-funds.service';

@Controller('organization')
@Resource('organization')
@ApiTags('Admin: Organization')
export class OrganizationControllerAdmin {
    constructor(
        private readonly organizationService: OrganizationFundsService,
    ) {}
}
