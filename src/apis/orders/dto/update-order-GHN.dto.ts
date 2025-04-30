import { PartialType } from '@nestjs/swagger';
import { CreateOrderGHNDto } from './create-order-GHN.dto';

export class UpdateOrderGHNDto extends PartialType(CreateOrderGHNDto) {}
