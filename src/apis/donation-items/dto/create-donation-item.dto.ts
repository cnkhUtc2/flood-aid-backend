import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class CreateDonationItemDto {
    @SuperApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    message: string;

    @SuperApiProperty({
        type: String,
        required: false,
        enum: ['FUND', 'CASE'],
        default: 'CASE',
    })
    @IsNotEmpty()
    @IsEnum(['FUND', 'CASE'])
    type: string;

    @SuperApiProperty({
        type: String,
        enum: ['open', 'accepted', 'declined'],
        default: 'open',
    })
    @IsEnum(['open', 'accepted', 'declined'])
    status: string;

    @SuperApiProperty({
        type: [CreateItemDto],
        required: false,
    })
    items: CreateItemDto[];

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsString()
    donorName: string;
}
