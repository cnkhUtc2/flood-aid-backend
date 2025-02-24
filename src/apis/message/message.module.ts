import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { Module } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { Message, MessageSchema } from './entities/message.entity';
import { MessageService } from './message.service';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.MESSAGE,
                schema: MessageSchema,
                entity: Message,
            },
        ]),
    ],
    controllers: [],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}
