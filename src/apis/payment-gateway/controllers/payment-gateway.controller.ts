import { Controller, HttpCode, Req, Res, Headers, Body } from '@nestjs/common';
import { Request } from 'express';
import { PaymentGatewayService } from '../payment-gateway.service';
import { SuperPost } from '@libs/super-core';
import { Resource } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('stripe')
@Resource('stripe')
@ApiTags('Front: Stripe')
export class PaymentGatewayController {
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
    ) {}

    @SuperPost({ route: 'checkout', dto: CreatePaymentDto })
    async createCheckout(@Body() payment: CreatePaymentDto) {
        return this.paymentGatewayService.createCheckoutSession(payment);
    }

    @SuperPost({ route: 'webhook' })
    @HttpCode(200)
    async handleWebhook(
        @Req() request: Request,
        @Res() response: import('express').Response,
        @Headers('stripe-signature') sig: string,
    ) {
        console.log('here');
        try {
            const event = this.paymentGatewayService.verifyWebhook(
                request['rawBody'],
                sig,
            );
            await this.paymentGatewayService.handleStripeEvent(event);
            return response.status(200).send('Event received');
        } catch (err) {
            console.error('Error processing webhook:', err);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
}
