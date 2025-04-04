import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsExist } from 'src/common/services/is-exist-constraint.service';
import { COLLECTION_NAMES } from 'src/constants';
import { convertStringToObjectId } from 'src/utils/helper';

export class CreateProfileDto {
    @SuperApiProperty({
        type: String,
        required: false,
        title: 'FirstName',
        description: 'FirstName of user',
    })
    @IsString()
    firstName: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'LastName',
        description: 'Lastname of user',
    })
    @IsString()
    lasName: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'phone',
        description: 'phone of user',
    })
    @IsString()
    phone: string;

    @SuperApiProperty({
        type: String,
        required: false,
        title: 'Adress',
        description: 'Address of user',
    })
    @IsString()
    address: string;

    @SuperApiProperty({
        type: String,
        description: 'Image of profile',
        title: 'Image',
        cms: {
            ref: COLLECTION_NAMES.FILE,
        },
    })
    @IsOptional()
    @Transform(({ value }) => convertStringToObjectId(value))
    @IsExist({
        collectionName: COLLECTION_NAMES.FILE,
        message: 'Image does not exist',
    })
    image: Types.ObjectId;
}
