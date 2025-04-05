import { Module } from '@nestjs/common';
import { SupportTicketService } from './ticket.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    SupportTicket,
    SupportTicketSchema,
} from './entities/support-ticket.entity';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.SUPPORT_TICKET,
                schema: SupportTicketSchema,
                entity: SupportTicket,
            },
        ]),
        MailModule,
    ],
    controllers: [],
    providers: [SupportTicketService],
    exports: [SupportTicketService],
})
export class TicketModule {}
