import { PartialType } from '@nestjs/swagger';
import { CreateOrganizationFundDto } from './create-organization-fund.dto';

export class UpdateOrganizationFundDto extends PartialType(
    CreateOrganizationFundDto,
) {}
