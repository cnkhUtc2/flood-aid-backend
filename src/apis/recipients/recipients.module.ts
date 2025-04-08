import { Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Recipient, RecipientSchema } from './entities/recipient.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.RECIPIENT,
                schema: RecipientSchema,
                entity: Recipient,
            },
        ]),
    ],
    providers: [RecipientsService],
    exports: [RecipientsService],
})
export class RecipientsModule {}
