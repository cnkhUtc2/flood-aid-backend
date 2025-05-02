import { PartialType } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { ExcludeDto } from 'src/base/dto/exclude.dto';
import { PostStatus } from '../constants';
import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { CreateSentimentDto } from 'src/apis/sentiments/dto/create-sentiment.dto';

export class CreatePostDto extends PartialType(ExcludeDto) {
    @SuperApiProperty({
        type: String,
        description: 'Name of the post',
        default: 'Post',
        title: 'Name',
        required: true,
    })
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @SuperApiProperty({
        type: String,
        description:
            'Status for this post. Available values: PUBLISHED & DRAFT',
        default: PostStatus.PUBLISHED,
        required: true,
        title: 'Status',
        enum: PostStatus,
    })
    @IsString()
    @IsEnum(PostStatus, {
        message: `status must be a valid enum ${PostStatus.PUBLISHED} | ${PostStatus.DRAFT}`,
    })
    @IsNotEmpty()
    status: PostStatus;

    @SuperApiProperty({
        type: Number,
        description: 'Position of the tag in the app',
        default: 0,
        title: 'Position Of Category',
    })
    @IsNumber()
    @IsOptional()
    position: number;

    @SuperApiProperty({
        type: CreateSentimentDto,
    })
    @IsOptional()
    sentimentDto: CreateSentimentDto;

    @SuperApiProperty({
        type: String,
        description: 'Short description of the post',
        default: 'Short description',
        title: 'Short Description',
        cms: {
            widget: 'textarea',
        },
    })
    @MaxLength(1000)
    @IsString()
    @IsOptional()
    shortDescription: string;

    @SuperApiProperty({
        type: String,
        description: 'Long description of the post',
        default: 'Long description',
        title: 'Long Description',
        cms: {
            widget: 'textEditor',
        },
    })
    @IsString()
    @IsOptional()
    longDescription: string;
}
