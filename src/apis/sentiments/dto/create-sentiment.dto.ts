import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSentimentDto {
    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    positive: number;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    negative: number;

    @SuperApiProperty({
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    neutral: number;

    @SuperApiProperty({
        type: String,
        enum: ['POST', 'COMMENT'],
    })
    type: string;
}
