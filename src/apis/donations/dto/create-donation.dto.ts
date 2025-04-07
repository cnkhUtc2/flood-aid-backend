import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
    IsNotEmpty,
    IsString,
    IsEnum,
    IsArray,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateDonationDto {
    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    title: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    content: string;

    @SuperApiProperty({
        type: String,
        required: false,
        enum: ['FUND', 'CASE'],
    })
    @IsNotEmpty()
    @IsEnum(['FUND', 'CASE'])
    type: string;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsNumber()
    amount: number;

    @SuperApiProperty({
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    items: string[];

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    donorName: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    paymentMethod: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    currency: string;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsString()
    cardLast4digits: number;
}
