import { Body, Controller } from '@nestjs/common';
import { RecipientsService } from '../recipients.service';
import { CreateRecipientDto } from '../dto/create-recipient.dto';

@Controller('recipients')
export class RecipientsControllerAdmin {
    constructor(private readonly recipientsService: RecipientsService) {}

    async createOne(@Body() recipient: CreateRecipientDto) {
        const result = await this.recipientsService.createOne(recipient);
        return result;
    }
}
