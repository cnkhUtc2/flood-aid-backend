import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEnum,
    IsDateString,
    IsNumber,
} from 'class-validator';

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
        required: true,
        title: 'Status',
        description: 'Status of the relief case',
        enum: ['active', 'closed'],
    })
    @IsNotEmpty()
    @IsEnum(['active', 'closed'])
    status: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Start Date',
        description: 'Start date of the relief case (ISO format)',
        example: '2025-04-01T00:00:00.000Z',
    })
    @IsNotEmpty()
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

    // Optional mediaLinks (uncomment if you want to use it)
    // @SuperApiProperty({
    //     type: [String],
    //     required: false,
    //     title: 'Media Links',
    //     description: 'Media links related to the relief case',
    // })
    // @IsOptional()
    // mediaLinks?: string[];

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
}
