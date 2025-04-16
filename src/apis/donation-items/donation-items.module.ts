import { Module } from '@nestjs/common';
import { DonationItemsService } from './donation-items.service';
import { Item, ItemSchema } from '../donation-items/entities/item.entity';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import {
    DonationItem,
    DonationItemSchema,
} from './entities/donaion-item.entity';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.ITEM,
                schema: ItemSchema,
                entity: Item,
            },
        ]),
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.DONATION_ITEM,
                schema: DonationItemSchema,
                entity: DonationItem,
            },
        ]),
        UserModule,
        MailModule,
    ],
    providers: [DonationItemsService],
    exports: [DonationItemsService],
})
export class DonationItemsModule {}
