import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Sentiment, SentimentSchema } from './entities/sentiment.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.SENTIMENT,
                schema: SentimentSchema,
                entity: Sentiment,
            },
        ]),
    ],
    providers: [SentimentsService],
    exports: [SentimentsService],
})
export class SentimentsModule {}
