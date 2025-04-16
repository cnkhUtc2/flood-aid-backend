import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRecipientDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    stripeAccountId: string;

    @SuperApiProperty({
        type: String,
        required: false,
        enum: ['express', 'custom', 'standard'],
        default: 'express',
    })
    @IsOptional()
    @IsEnum(['express', 'custom', 'standard'])
    type?: string = 'express';

    @SuperApiProperty({
        type: String,
        required: false,
        description: 'Full name of the recipient',
    })
    @IsOptional()
    @IsString()
    name?: string;
}
