import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    Conversation,
    ConversationSchema,
} from './entities/conversation.entity';
import { ConversationService } from './conversation.service';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.CONVERSATION,
                schema: ConversationSchema,
                entity: Conversation,
            },
        ]),
    ],
    controllers: [],
    providers: [ChatGateway, ConversationService],
    exports: [ChatGateway, ConversationService],
})
export class ConversationModule {}
