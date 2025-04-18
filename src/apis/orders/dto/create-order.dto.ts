import { SuperApiProperty } from '@libs/super-core';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { convertStringToObjectId } from 'src/utils/helper';
import { CreateOrderGHNDto } from './create-order-GHN.dto';

export class CreateOrderDto {
    @SuperApiProperty({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    @Transform(({ value }) => convertStringToObjectId(value))
    donationItem: string;

    @SuperApiProperty({
        required: true,
        type: CreateOrderGHNDto,
    })
    @IsNotEmpty()
    order: CreateOrderGHNDto;
}
