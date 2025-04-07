import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsString, IsNumber } from 'class-validator';

export class CreateOrganizationFundDto {
    @SuperApiProperty({
        type: String,
    })
    @IsString()
    name: string;

    @SuperApiProperty({
        type: String,
    })
    @IsNumber()
    description: string;

    @SuperApiProperty({
        type: Number,
    })
    goalAmount: number;

    @SuperApiProperty({
        type: Number,
    })
    currentAmount: number;
}
