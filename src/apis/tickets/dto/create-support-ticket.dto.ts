import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateSupportTicketDto {
    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Title',
        description: 'Title of the support ticket',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Purpose',
        description: 'Purpose of the support ticket',
    })
    @IsNotEmpty()
    @IsString()
    purpose: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Description',
        description: 'Detailed description of the support ticket',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Priority',
        description: 'Priority level of the support ticket',
        enum: ['low', 'medium', 'high'],
    })
    @IsNotEmpty()
    @IsEnum(['low', 'medium', 'high'])
    priority: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Status',
        description: 'Current status of the support ticket',
        enum: ['OPEN', 'ACCEPTED', 'DECLINED'],
    })
    @IsNotEmpty()
    @IsEnum(['OPEN', 'ACCEPTED', 'DECLINED'])
    status: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'Location',
        description: 'Location related to the support ticket',
    })
    @IsOptional()
    @IsString()
    location?: string;

    // @SuperApiProperty({
    //     type: [String],
    //     required: false,
    //     title: 'Attachments',
    //     description: 'List of file attachments for the support ticket',
    // })
    // @IsOptional()
    // attachments?: string[];
}
