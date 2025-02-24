import { Module } from '@nestjs/common';
import { MediaModule } from 'src/apis/media/medias.module';
import { UserModule } from 'src/apis/users/user.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { CategoriesModule } from 'src/apis/categories/categories.module';
import { PostsModule } from 'src/apis/posts/posts.module';
import { MetadataModule } from 'src/apis/metadata/metadata.module';
import { CategoriesController } from 'src/apis/categories/controllers/categories.controller';
import { AuthController } from 'src/apis/auth/controllers/auth.controller';
import { MediaController } from 'src/apis/media/controllers/medias.controller';
import { MetadataController } from 'src/apis/metadata/controllers/metadata.controller';
import { PostsController } from 'src/apis/posts/controllers/posts.controller';
import { UserController } from 'src/apis/users/controllers/user.controller';
import { ConversationController } from 'src/apis/conversations/controllers/conversation.controller';
import { MessageController } from 'src/apis/message/controllers/message.controller';
import { ConversationModule } from 'src/apis/conversations/conversation.module';
import { MessageModule } from 'src/apis/message/message.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        MediaModule,
        AuthModule,
        CategoriesModule,
        PostsModule,
        MetadataModule,
        ConversationModule,
        MessageModule,
    ],
    controllers: [
        UserController,
        MediaController,
        AuthController,
        CategoriesController,
        PostsController,
        MetadataController,
        ConversationController,
        MessageController,
    ],
    providers: [],
})
export class RouterFrontsModule {}
