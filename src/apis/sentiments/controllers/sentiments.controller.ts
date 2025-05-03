import { Body, Controller, Query } from '@nestjs/common';
import { SentimentsService } from '../sentiments.service';
import { SuperGet, SuperPost } from '@libs/super-core';
import { CreateSentimentDto } from '../dto/create-sentiment.dto';
import { Resource } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';

@Controller('sentiments')
@Resource('sentiments')
@ApiTags('Front: Sentiment')
export class SentimentsController {
    constructor(private readonly sentimentsService: SentimentsService) {}

    @SuperGet({ route: '/' })
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
        options?: Record<string, any>,
    ) {
        const result = await this.sentimentsService.getAll(
            queryParams,
            options,
        );
        return result;
    }

    @SuperPost({ route: 'create', dto: CreateSentimentDto })
    async createSentiment(@Body() sentiment: CreateSentimentDto) {
        const res = await this.sentimentsService.model.create(sentiment);
        return res;
    }
}
