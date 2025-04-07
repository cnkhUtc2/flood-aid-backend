import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsString } from 'class-validator';

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
}
