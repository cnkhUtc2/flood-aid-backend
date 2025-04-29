import { Controller, Body, Query, Req, Param } from '@nestjs/common';
import { PaymentGatewayService } from '../payment-gateway.service';
import { SuperGet, SuperPut } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { ApiTags } from '@nestjs/swagger';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { AccountDto } from '../dto/account.dto';
import { VnpayService } from '../vnpay.service';
import { TransactionService } from '../transaction.service';
import { Request } from 'express';
import { Types } from 'mongoose';

@Controller('payment-gateway')
@Resource('payment-gateway')
@ApiTags('Admin: PaymentGateway')
export class PaymentGatewayControllerAdmin {
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
        private readonly vnpayService: VnpayService,
        private readonly transactionService: TransactionService,
    ) {}

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

    @SuperGet({ route: 'create-vnpay-url' })
    @SuperAuthorize(PERMISSION.GET)
    createVnpayUrl(
        @Query('amount') amount: number,
        @Query('currency') currency: string,
        @Req() req: Request,
        @Me() user: UserPayload,
    ) {
        const ipAddr =
            (Array.isArray(req.headers['x-forwarded-for'])
                ? req.headers['x-forwarded-for'][0]
                : req.headers['x-forwarded-for']) ||
            req.socket?.remoteAddress ||
            req.connection?.remoteAddress;

        const url = this.vnpayService.createPaymentUrl(
            amount,
            currency,
            ipAddr,
            user,
        );
        return { url };
    }

    @SuperGet({ route: 'vnpay-return' })
    async getPayment(@Query() query: Record<string, any>) {
        const orderInfo = decodeURIComponent(query.vnp_OrderInfo);
        const userIdMatch = orderInfo.match(/cho user:\s*([a-f0-9]{24})/i);
        const createdBy = userIdMatch ? userIdMatch[1] : null;

        const transaction = {
            txnRef: query.vnp_TxnRef,
            amount: parseInt(query.vnp_Amount),
            bankCode: query.vnp_BankCode,
            bankTranNo: query.vnp_BankTranNo,
            cardType: query.vnp_CardType,
            orderInfo: decodeURIComponent(query.vnp_OrderInfo),
            payDate: query.vnp_PayDate,
            responseCode: query.vnp_ResponseCode,
            transactionNo: query.vnp_TransactionNo,
            transactionStatus: query.vnp_TransactionStatus,
            secureHash: query.vnp_SecureHash,
            status:
                query.vnp_ResponseCode === '00' &&
                query.vnp_TransactionStatus === '00'
                    ? 'success'
                    : 'failed',
            createdBy: new Types.ObjectId(createdBy),
        };

        await this.transactionService.model.create(transaction);

        return transaction;
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
