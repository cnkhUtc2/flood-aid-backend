import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsMongoId,
    ArrayNotEmpty,
} from 'class-validator';

export class CreateItemDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    number: number;

    @SuperApiProperty({
        type: [String],
        required: true,
        default: ['60f3b3b3b3b3b3b3b3b3b3'],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsMongoId({ each: true })
    categories: string[];
}
