import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';

@Module({
    controllers: [],
    providers: [PaymentGatewayService],
    exports: [PaymentGatewayService],
})
export class PaymentGatewayModule {}
