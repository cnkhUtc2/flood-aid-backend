import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { PostSchema, Post } from './entities/posts.entity';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { MediaModule } from '../media/medias.module';
import { SentimentsModule } from '../sentiments/sentiments.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            { name: COLLECTION_NAMES.POST, schema: PostSchema, entity: Post },
        ]),
        MediaModule,
        SentimentsModule,
    ],
    controllers: [],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule {}
