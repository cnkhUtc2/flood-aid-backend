import { Controller, Body, Query, Req, Res, Param } from '@nestjs/common';
import { PaymentGatewayService } from '../payment-gateway.service';
import { SuperGet, SuperPut } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { AccountDto } from '../dto/account.dto';
import { Request, Response } from 'express';
import { TransactionService } from '../transaction.service';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { Types } from 'mongoose';

@Controller('payment-gateway')
@Resource('payment-gateway')
@ApiTags('Front: PaymentGateway')
export class PaymentGatewayController {
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
        private readonly transactionService: TransactionService,
    ) {}

    @SuperGet({ route: 'create-vnpay-url' })
    @SuperAuthorize(PERMISSION.GET)
    async createVnpayUrl(
        @Query('amount') amount: number,
        @Query('currency') currency: string,
        @Req() req: Request,
        @Me() user: UserPayload,
    ) {
        const result = await this.paymentGatewayService.createVnpayUrl(
            amount,
            currency,
            req,
            user,
        );

        return result;
    }

    @SuperGet({ route: 'vnpay-return' })
    async getPayment(
        @Query() query: Record<string, any>,
        @Res() res: Response,
    ) {
        const result = await this.paymentGatewayService.vnpayReturn(query, res);

        return result;
    }

    // @SuperPost({ route: 'checkout', dto: CreatePaymentDto })
    // @SuperAuthorize(PERMISSION.POST)
    // async createCheckout(
    //     @Body() payment: CreatePaymentDto,
    //     @Me() user: UserPayload,
    // ) {
    //     return this.paymentGatewayService.createCheckoutSession(payment, user);
    // }

    // @SuperPost({ route: 'webhook' })
    // @HttpCode(200)
    // async handleWebhook(
    //     @Req() request: Request,
    //     @Res() response: import('express').Response,
    //     @Headers('stripe-signature') sig: string,
    // ) {
    //     try {
    //         const event = this.paymentGatewayService.verifyWebhook(
    //             request['rawBody'],
    //             sig,
    //         );
    //         await this.paymentGatewayService.handleStripeEvent(event);
    //         return response.status(200).send('Event received');
    //     } catch (err) {
    //         console.error('Error processing webhook:', err);
    //         return response.status(400).send(`Webhook Error: ${err.message}`);
    //     }
    // }

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

    @SuperGet({ route: '/transactions' })
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
        options?: Record<string, any>,
    ) {
        const result = await this.transactionService.getAll(
            queryParams,
            options,
        );
        return result;
    }

    @SuperGet({ route: '/transaction/:id' })
    async getOne(@Param('id') id: string) {
        const result = await this.transactionService.getOne(
            new Types.ObjectId(id),
        );
        return result;
    }
}
