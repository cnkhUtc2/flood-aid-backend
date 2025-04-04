import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportTicketDto {
    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Title',
        description: 'Title of support ticket',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Purpose',
        description: 'Purpose',
    })
    @IsNotEmpty()
    @IsString()
    purpose: string;
}
