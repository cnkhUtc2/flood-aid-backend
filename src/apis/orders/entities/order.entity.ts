import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DonationItem } from 'src/apis/donation-items/entities/donaion-item.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.ORDER,
})
export class Order extends AggregateRoot {
    @SuperProp({
        type: String,
    })
    orderCode: string;

    @SuperProp({
        type: String,
        enum: ['PENDING', 'SHIPPING', 'DELIVERED', 'FAIL'],
    })
    status: string;

    @SuperProp({
        type: String,
        default: 'GHN',
    })
    deliveryPartner: string;

    @SuperProp({
        type: String,
    })
    trackingUrl?: string;

    @SuperProp({
        type: String,
    })
    expectDeliveryTime?: string;

    @SuperProp({
        type: String,
    })
    transType?: string;

    @SuperProp({
        type: String,
    })
    fromAddress: string;

    @SuperProp({
        type: String,
    })
    toAddress: string;

    @SuperProp({
        type: Number,
    })
    totalFee?: number; //shipping fee

    @SuperProp({
        type: Number,
    })
    weight?: number;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.DONATION_ITEM,
        refClass: DonationItem,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.DONATION_ITEM,
    })
    donationItem: Types.ObjectId;

    @SuperProp({
        type: Types.ObjectId,
        ref: COLLECTION_NAMES.USER,
        refClass: User,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.USER,
    })
    createdBy: Types.ObjectId;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(autopopulateSoftDelete);
