import { Inject, Injectable } from '@nestjs/common';
import { appSettings } from 'src/configs/app-settings';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DonationsService } from '../donations/donations.service';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from 'src/base/models/user-payload.model';
import { htmlContent } from '../mail/html/donate-success-notification';
import { RecipientsService } from '../recipients/recipients.service';
import { AccountDto } from './dto/account.dto';
import { Request, Response } from 'express';
import { TransactionService } from './transaction.service';
import { Types } from 'mongoose';
import { VnpayService } from './vnpay.service';
import { OrganizationFundsService } from '../organization-funds/organization-funds.service';

@Injectable()
export class PaymentGatewayService {
    constructor(
        private readonly donationService: DonationsService,
        private readonly recipientService: RecipientsService,
        private readonly transactionService: TransactionService,
        private readonly vnpayService: VnpayService,
        private readonly fund: OrganizationFundsService,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {}
    private stripe = new Stripe(appSettings.stripe.secretKey, {});

    async createCheckoutSession(payment: CreatePaymentDto, user: UserPayload) {
        const recipient = await this.recipientService.getOne({
            stripeAccountId: payment.receiverId,
        });

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: payment.amount * 100,
                        product_data: {
                            name: 'Donation',
                            description: 'We appreciate your kindness.',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: appSettings.donateUrl.donateSuccessUrl,
            cancel_url: appSettings.donateUrl.donateFailUrl,
            metadata: {
                message: payment.message || '',
                type: payment.type,
            },
            // payment_intent_data: {
            //     transfer_data: {
            //         destination: recipient.stripeAccountId,
            //     },
            // },
        });

        return { url: session.url! };
    }

    verifyWebhook(rawBody: Buffer, sig: string): Stripe.Event {
        return this.stripe.webhooks.constructEvent(
            rawBody,
            sig,
            appSettings.stripe.webhookSecret,
        );
    }

    async handleStripeEvent(event: Stripe.Event) {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            const email = session.customer_email;
            const message = {
                email,
                subject: 'Thank You for Your Generous Donation',
                text: `Dear Supporter, Thank you for your generous donation.`,
                html: htmlContent,
            };
            // await this.client.emit('send_email', message);

            const paymentIntent = await this.stripe.paymentIntents.retrieve(
                session.payment_intent as string,
            );
            const paymentMethod = await this.stripe.paymentMethods.retrieve(
                paymentIntent.payment_method as string,
            );

            await this.donationService.createOne({
                amount: Number(session.amount_total),
                type: session.metadata?.type,
                title: '',
                message: session.metadata?.message ?? '',
                items: [],
                donorName: session.customer_details?.name ?? '',
                cardLast4digits: paymentMethod.card?.last4
                    ? Number(paymentMethod.card.last4)
                    : 0,
                paymentMethod: paymentMethod.card?.brand,
                currency: session.currency,
            });

            console.log('Payment complete:', {
                brand: paymentMethod.card?.brand,
                last4: paymentMethod.card?.last4,
            });
        }
    }

    async createConnectedAccount(user: UserPayload) {
        const existing = await this.recipientService.getOne({
            email: user.email,
        });
        if (existing) {
            return { accountId: existing.stripeAccountId };
        }

        const account = await this.stripe.accounts.create({
            type: 'express',
            email: user.email,
            capabilities: {
                transfers: { requested: true },
            },
        });

        const accountLink = await this.stripe.accountLinks.create({
            account: account.id,
            refresh_url: `http://localhost:3000/stripe/reauth`,
            return_url: `http://localhost:3000/stripe/onboard-success?accountId=${account.id}`,
            type: 'account_onboarding',
        });

        return { accountId: account.id, url: accountLink.url };
    }

    async confirmStripeAccount(dto: AccountDto) {
        const account = await this.stripe.accounts.retrieve(dto.accountId);
        if (account.charges_enabled) {
            await this.recipientService.createOne({
                email: account.email,
                stripeAccountId: account.id,
            });
        }
    }

    async createVnpayUrl(
        amount: number,
        currency: string,
        req: Request,
        user: UserPayload,
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

        const { email } = user;

        const message = {
            email,
            subject: 'Thank You for Your Generous Donation',
            text: `Dear Supporter, Thank you for your generous donation.`,
            html: htmlContent,
        };
        await this.client.emit('send_email', message);
        return { url };
    }

    async vnpayReturn(query: Record<string, any>, res: Response) {
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

        await this.fund.model.findByIdAndUpdate(
            new Types.ObjectId('60d23f5c9b12a83e8c8f1234'),
            { currentAmount: transaction.amount ?? 0 },
        );

        return res.redirect(`http://localhost:5173/payment-success`);
    }
}
