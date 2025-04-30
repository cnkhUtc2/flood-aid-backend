import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsMongoId,
    ArrayNotEmpty,
    IsOptional,
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
        type: String,
        required: true,
    })
    @IsOptional()
    @IsString()
    code: string;

    @SuperApiProperty({
        type: Number,
        required: true,
        default: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsOptional()
    @IsNumber()
    price: number;

    @SuperApiProperty({
        type: Number,
        required: true,
        default: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    length: number;

    @SuperApiProperty({
        type: Number,
        required: true,
        default: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    width: number;

    @SuperApiProperty({
        type: Number,
        required: true,
        default: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    height: number;

    @SuperApiProperty({
        type: Number,
        required: true,
        default: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @SuperApiProperty({
        type: String,
        required: true,
        default: '60f3b3b3b3b3b3b3b3b3b3',
    })
    categories: string;
}
