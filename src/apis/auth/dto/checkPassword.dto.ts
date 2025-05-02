import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPasswordDto {
    @SuperApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @SuperApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
