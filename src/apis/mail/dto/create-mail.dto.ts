import { SuperApiProperty } from '@libs/super-core';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
    @SuperApiProperty({
        type: String,
        required: true,
    })
    to: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    subject: string;

    @SuperApiProperty({
        type: String,
        required: true,
    })
    text: string;
}
