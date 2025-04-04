import { Module } from '@nestjs/common';
import { SupportTicketService } from './ticket.service';
import { SupportTicketController } from './controllers/ticket.controller';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    SupportTicket,
    SupportTicketSchema,
} from './entities/support-ticket.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.SUPPORT_TICKET,
                schema: SupportTicketSchema,
                entity: SupportTicket,
            },
        ]),
    ],
    controllers: [],
    providers: [SupportTicketService],
    exports: [SupportTicketService],
})
export class TicketModule {}
