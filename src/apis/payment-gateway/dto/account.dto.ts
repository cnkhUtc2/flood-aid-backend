import { SuperApiProperty } from '@libs/super-core';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccountDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    accountId: string;
}
