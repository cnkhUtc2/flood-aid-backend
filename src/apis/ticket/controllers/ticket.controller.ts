import { Body, Controller, UseGuards } from '@nestjs/common';
import { SupportTicketService } from '../ticket.service';
import { CreateSupportTicketDto } from '../dto/create-support-ticket.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { SuperPost } from '@libs/super-core';
import { Resource } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { Me } from 'src/decorators/me.decorator';
import { JwtAuthGuard } from '@libs/super-authorize/guards/jwt-auth.guard';

@Controller('tickets')
@Resource('tickets')
@ApiTags('Front: Tickets')
export class SupportTicketController {
    constructor(private readonly ticketService: SupportTicketService) {}

    @SuperPost({ route: 'create', dto: CreateSupportTicketDto })
    @UseGuards(JwtAuthGuard)
    async createOne(
        @Me() user: UserPayload,
        @Body() ticket: CreateSupportTicketDto,
    ) {
        return this.ticketService.createOne(ticket, user);
    }
}
