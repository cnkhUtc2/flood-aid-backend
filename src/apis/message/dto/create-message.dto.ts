import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import { convertStringToObjectId } from 'src/utils/helper';

export class CreateMessageDto {
    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Text',
        description: 'Text which is sent by user',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Sender',
        description: 'User who send the message',
        cms: {
            ref: COLLECTION_NAMES.USER,
        },
    })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => convertStringToObjectId(value))
    sender: Types.ObjectId;

    @SuperApiProperty({
        type: String,
        required: true,
        title: 'Conversation',
        description: 'Conversation contains user id',
        cms: {
            ref: COLLECTION_NAMES.CONVERSATION,
        },
    })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => convertStringToObjectId(value))
    conversation: Types.ObjectId;
}
