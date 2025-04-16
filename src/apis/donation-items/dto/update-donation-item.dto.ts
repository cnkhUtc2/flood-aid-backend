import { PartialType } from '@nestjs/swagger';
import { CreateDonationItemDto } from './create-donation-item.dto';

export class UpdateDonationItemDto extends PartialType(CreateDonationItemDto) {}
