import { IsNotEmpty, IsString } from 'class-validator';
import { SuperApiProperty } from '@libs/super-core';

export class GoogleLogin {
    @SuperApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    token: string;
}
