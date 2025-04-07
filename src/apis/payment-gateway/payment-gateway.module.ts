import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { DonationsModule } from '../donations/donations.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [DonationsModule, MailModule],
    providers: [PaymentGatewayService],
    exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
