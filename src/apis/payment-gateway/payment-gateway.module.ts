import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { DonationsModule } from '../donations/donations.module';
import { MailModule } from '../mail/mail.module';
import { RecipientsModule } from '../recipients/recipients.module';
import { VnpayService } from './vnpay.service';
import { TransactionService } from './transaction.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.TRANSACTION,
                schema: TransactionSchema,
                entity: Transaction,
            },
        ]),
        DonationsModule,
        MailModule,
        RecipientsModule,
    ],
    providers: [PaymentGatewayService, VnpayService, TransactionService],
    exports: [PaymentGatewayService, VnpayService, TransactionService],
})
export class PaymentGatewayModule {}
