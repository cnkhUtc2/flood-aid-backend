import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { DonationsModule } from '../donations/donations.module';

@Module({
    imports: [DonationsModule],
    providers: [PaymentGatewayService],
    exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
