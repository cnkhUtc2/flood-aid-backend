import { SuperApiProperty } from '@libs/super-core';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'Content',
        description: 'Donor message',
    })
    @IsOptional()
    @IsString()
    message: string;
}
