import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { convertStringToObjectId } from 'src/utils/helper';

export class AddFriendDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => convertStringToObjectId(value))
    friendId: string;
}
