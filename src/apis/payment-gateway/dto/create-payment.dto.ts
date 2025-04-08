import { SuperApiProperty } from '@libs/super-core';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

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

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Type',
        description: 'Type of donation',
    })
    @IsEnum(['FUND', 'CASE'])
    type: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    receiverId: string;
}
