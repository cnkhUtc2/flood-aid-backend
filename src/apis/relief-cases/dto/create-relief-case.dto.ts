import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEnum,
    IsDateString,
    IsNumber,
} from 'class-validator';
import { convertStringToObjectId } from 'src/utils/helper';

export class CreateReliefCaseDto {
    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Case Name',
        description: 'Name of the relief case',
    })
    @IsNotEmpty()
    @IsString()
    caseName: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Description',
        description: 'Description of the relief case',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Location',
        description: 'Location related to the relief case',
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @SuperApiProperty({
        type: String,
        enum: ['ACTIVE', 'CLOSED'],
    })
    @IsOptional()
    @IsEnum(['ACTIVE', 'CLOSED'])
    status: string;

    @SuperApiProperty({
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'],
    })
    @IsOptional()
    @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'])
    priority: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Start Date',
        description: 'Start date of the relief case (ISO format)',
        example: '2025-04-01T00:00:00.000Z',
    })
    @IsOptional()
    @IsDateString()
    startDate: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'End Date',
        description: 'End date of the relief case (ISO format)',
        example: '2025-04-30T00:00:00.000Z',
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @SuperApiProperty({
        type: Number,
        required: false,
        title: 'Total Donations',
        description: 'Total donation amount collected',
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    totalDonations?: number;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'Contact Email',
        description: 'Contact email for the relief case',
    })
    @IsOptional()
    @IsString()
    contactEmail?: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'Contact Phone',
        description: 'Contact phone number for the relief case',
    })
    @IsOptional()
    @IsString()
    contactPhone?: string;

    @SuperApiProperty({
        required: true,
        type: String,
    })
    @IsOptional()
    @Transform(({ value }) => convertStringToObjectId(value))
    supportTicket: string;
}
