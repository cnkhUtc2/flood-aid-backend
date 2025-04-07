import { SuperApiProperty } from '@libs/super-core';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
    @SuperApiProperty({
        type: Number,
        required: true,
        title: 'Amount',
        description: 'Amount of donation',
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
