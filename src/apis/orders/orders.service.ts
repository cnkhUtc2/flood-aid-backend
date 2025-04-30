import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { OrderDocument } from './entities/order.entity';
import { BaseService } from 'src/base/service/base.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { appSettings } from 'src/configs/app-settings';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrdersService extends BaseService<OrderDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.ORDER)
        private readonly orderModel: ExtendedModel<OrderDocument>,
        private readonly httpService: HttpService,
    ) {
        super(orderModel);
    }

    async createOrder(body: CreateOrderDto, user: UserPayload) {
        try {
            const response = await this.httpService.axiosRef.post(
                appSettings.transport.ghnApi,
                body.order,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ShopId: appSettings.transport.ghnShopId,
                        Token: appSettings.transport.ghnToken,
                    },
                },
            );
            await this.createOne(
                {
                    orderCode: response.data.data.order_code,
                    status: 'PENDING',
                    deliveryPartner: 'GHN',
                    trackingUrl: `https://tracking.ghn.dev/?order_code=${response.data.data.order_code}`,
                    expectDeliveryTime: response.data.expected_delivery_time,
                    transType: response.data.data.trans_type,
                    fromAddress:
                        body.order.from_province_name +
                        ', ' +
                        body.order.from_district_name +
                        ', ' +
                        body.order.from_ward_name +
                        ', ' +
                        body.order.from_address,
                    toAddress:
                        body.order.to_province_name +
                        ', ' +
                        body.order.to_district_name +
                        ', ' +
                        body.order.to_ward_name +
                        ', ' +
                        body.order.to_address,
                    totalFee: response.data.total_fee,
                    weight: body.order.weight,
                    items: body.order.items,
                    donationItem: body.donationItem,
                },
                user,
            );

            return response.data;
        } catch (e) {
            console.error('GHN API error:', e.response?.data || e.message);
            return e.response?.data;
        }
    }
}
