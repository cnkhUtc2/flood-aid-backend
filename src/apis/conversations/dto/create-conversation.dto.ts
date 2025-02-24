import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateConversationDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    senderId: Types.ObjectId;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    receiverId: Types.ObjectId;
}
