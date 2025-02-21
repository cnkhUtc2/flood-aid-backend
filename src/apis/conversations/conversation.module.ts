import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    Conversation,
    ConversationSchema,
} from './entities/conversation.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.POST,
                schema: ConversationSchema,
                entity: Conversation,
            },
        ]),
    ],
    controllers: [],
    providers: [ChatGateway],
    exports: [ChatGateway],
})
export class ConversationModule {}
