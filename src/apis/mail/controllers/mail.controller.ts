import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailService } from '../mail.service';

@Controller()
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @EventPattern('send_email')
    async handleSendEmail(data: any) {
        console.log('here');
        return this.mailService.handleSendEmail(data);
    }
}
