import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from 'src/apis/donation-items/entities/item.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { AggregateRoot } from 'src/base/entities/aggregate-root.schema';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.ORDER,
})
export class Order extends AggregateRoot {
    @SuperProp({ type: String })
    from_name?: string;

    @SuperProp({ type: String })
    from_phone?: string;

    @SuperProp({ type: String })
    from_address?: string;

    @SuperProp({ type: String })
    from_ward_name?: string;

    @SuperProp({ type: String })
    from_district_name?: string;

    @SuperProp({ type: String })
    from_province_name?: string;

    @SuperProp({ type: String, required: true })
    to_name: string;

    @SuperProp({ type: String, required: true })
    to_phone: string;

    @SuperProp({ type: String, required: true })
    to_address: string;

    @SuperProp({ type: String, required: true })
    to_ward_name: string;

    @SuperProp({ type: String, required: true })
    to_district_name: string;

    @SuperProp({ type: String, required: true })
    to_province_name: string;

    @SuperProp({ type: String })
    return_phone?: string;

    @SuperProp({ type: String })
    return_address?: string;

    @SuperProp({ type: String })
    return_district_name?: string;

    @SuperProp({ type: String })
    return_ward_name?: string;

    @SuperProp({ type: String })
    return_province_name?: string;

    @SuperProp({ type: String })
    client_order_code?: string;

    @SuperProp({ type: Number })
    cod_amount?: number;

    @SuperProp({ type: String })
    content?: string;

    @SuperProp({ type: Number })
    weight?: number;

    @SuperProp({ type: Number })
    length?: number;

    @SuperProp({ type: Number })
    width?: number;

    @SuperProp({ type: Number })
    height?: number;

    @SuperProp({ type: Number })
    pick_station_id?: number;

    @SuperProp({ type: Number })
    insurance_value?: number;

    @SuperProp({ type: String })
    coupon?: string;

    @SuperProp({ type: Number, required: true })
    service_type_id: number;

    @SuperProp({ type: Number, required: true })
    payment_type_id: number;

    @SuperProp({ type: String })
    note?: string;

    @SuperProp({ type: String, required: true })
    required_note: string;

    @SuperProp({ type: [Number] })
    pick_shift?: number[];

    @SuperProp({ type: Number })
    pickup_time?: number;

    @SuperProp({
        type: [Types.ObjectId],
        ref: COLLECTION_NAMES.ITEM,
        refClass: Item,
    })
    @AutoPopulate({
        ref: COLLECTION_NAMES.ITEM,
    })
    items: Types.ObjectId[];

    @SuperProp({ type: Number })
    cod_failed_amount?: number;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(autopopulateSoftDelete);
