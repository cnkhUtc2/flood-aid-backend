import { Inject, Injectable } from '@nestjs/common';
import { appSettings } from 'src/configs/app-settings';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DonationsService } from '../donations/donations.service';
import { ClientProxy } from '@nestjs/microservices';
import { UserPayload } from 'src/base/models/user-payload.model';
import { htmlContent } from '../mail/html/donate-success-norification';

@Injectable()
export class PaymentGatewayService {
    constructor(
        private readonly donationService: DonationsService,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {}
    private stripe = new Stripe(appSettings.stripe.secretKey, {});

    async createCheckoutSession(payment: CreatePaymentDto, user: UserPayload) {
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
            },
        });

        if (session.url === appSettings.donateUrl.donateFailUrl) {
        }

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
            await this.client.emit('send_email', message);

            const paymentIntent = await this.stripe.paymentIntents.retrieve(
                session.payment_intent as string,
            );
            const paymentMethod = await this.stripe.paymentMethods.retrieve(
                paymentIntent.payment_method as string,
            );

            await this.donationService.createOne({
                amount: Number(session.amount_total),
                type: 'FUND',
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
}
