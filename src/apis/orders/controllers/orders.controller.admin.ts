import { Body, Controller, Param, Query } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { SuperGet, SuperPost, SuperPut } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Me } from 'src/decorators/me.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { UpdateOrderGHNDto } from '../dto/update-order-GHN.dto';
import { Types } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders')
@Resource('orders')
@ApiTags('Admin: Orders')
export class OrdersControllerAdmin {
    constructor(private readonly ordersService: OrdersService) {}

    @SuperGet({ route: '/' })
    @SuperAuthorize(PERMISSION.GET)
    async getAll(
        @Query(new PagingDtoPipe())
        queryParams: ExtendedPagingDto,
    ) {
        const result = await this.ordersService.getAll(queryParams);
        return result;
    }

    @SuperPost({ route: 'create', dto: CreateOrderDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(@Body() body: CreateOrderDto, @Me() user: UserPayload) {
        const result = await this.ordersService.createOrder(body, user);
        return result;
    }

    @SuperPut({ route: 'update/:id', dto: UpdateOrderGHNDto })
    @SuperAuthorize(PERMISSION.PUT)
    async updateOne(
        @Param('id') id: string,
        @Body() order: UpdateOrderGHNDto,
        @Me() user: UserPayload,
    ) {
        const result = await this.ordersService.updateOneById(
            new Types.ObjectId(id),
            order,
            user,
        );
        return result;
    }
}
