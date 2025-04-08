import { Controller, HttpCode, Req, Res, Headers, Body } from '@nestjs/common';
import { Request } from 'express';
import { PaymentGatewayService } from '../payment-gateway.service';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { AccountDto } from '../dto/account.dto';

@Controller('stripe')
@Resource('stripe')
@ApiTags('Front: Stripe')
export class PaymentGatewayController {
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
    ) {}

    @SuperPost({ route: 'checkout', dto: CreatePaymentDto })
    @SuperAuthorize(PERMISSION.POST)
    async createCheckout(
        @Body() payment: CreatePaymentDto,
        @Me() user: UserPayload,
    ) {
        return this.paymentGatewayService.createCheckoutSession(payment, user);
    }

    @SuperPost({ route: 'webhook' })
    @HttpCode(200)
    async handleWebhook(
        @Req() request: Request,
        @Res() response: import('express').Response,
        @Headers('stripe-signature') sig: string,
    ) {
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

    @SuperGet({ route: 'create-connected-account' })
    @SuperAuthorize(PERMISSION.GET)
    async createConnectedAccount(@Me() user: UserPayload) {
        return await this.paymentGatewayService.createConnectedAccount(user);
    }

    @SuperPut({ route: 'stripe/confirm', dto: AccountDto })
    @SuperAuthorize(PERMISSION.PUT)
    async confirmStripeAccount(@Body() dto: AccountDto) {
        return await this.paymentGatewayService.confirmStripeAccount(dto);
    }
}
