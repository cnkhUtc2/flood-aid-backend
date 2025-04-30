import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateSupportTicketDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    purpose: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @SuperApiProperty({
        type: String,
        required: false,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
    })
    @IsOptional()
    @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
    priority: string;

    @SuperApiProperty({
        type: Boolean,
        required: false,
    })
    @IsOptional()
    isCreatedReliefCase: boolean;

    @SuperApiProperty({
        type: String,
        required: true,
        enum: ['OPEN', 'ACCEPTED', 'DECLINED'],
    })
    @IsNotEmpty()
    @IsEnum(['OPEN', 'ACCEPTED', 'DECLINED'])
    status: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    city?: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    province?: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    ward?: string;

    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    address?: string;
}
