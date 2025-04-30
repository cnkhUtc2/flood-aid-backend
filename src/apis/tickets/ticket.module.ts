import { Module } from '@nestjs/common';
import { SupportTicketService } from './ticket.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    SupportTicket,
    SupportTicketSchema,
} from './entities/support-ticket.entity';
import { MailModule } from '../mail/mail.module';
import { MediaModule } from '../media/medias.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.SUPPORT_TICKET,
                schema: SupportTicketSchema,
                entity: SupportTicket,
            },
        ]),
        MediaModule,
        MailModule,
    ],
    controllers: [],
    providers: [SupportTicketService],
    exports: [SupportTicketService],
})
export class TicketModule {}
