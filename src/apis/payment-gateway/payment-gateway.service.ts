import { Injectable } from '@nestjs/common';
import { appSettings } from 'src/configs/app-settings';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentGatewayService {
    private stripe = new Stripe(appSettings.stripe.secretKey, {});

    async createCheckoutSession(payment: CreatePaymentDto) {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
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
            success_url: 'http://localhost:5173/payment-success',
            cancel_url: 'http://localhost:5173/payment-fail',
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

            const paymentIntent = await this.stripe.paymentIntents.retrieve(
                session.payment_intent as string,
            );
            const paymentMethod = await this.stripe.paymentMethods.retrieve(
                paymentIntent.payment_method as string,
            );

            console.log('Payment complete:', {
                brand: paymentMethod.card?.brand,
                last4: paymentMethod.card?.last4,
            });
        }
    }
}
