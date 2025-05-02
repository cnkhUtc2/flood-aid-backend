import { Body, Controller, Query } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { SuperGet, SuperPost } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Me } from 'src/decorators/me.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';
import {
    ExtendedPagingDto,
    PagingDtoPipe,
} from 'src/pipes/page-result.dto.pipe';
import { authorize } from 'passport';

@Controller('orders')
@Resource('orders')
@ApiTags('Front: Orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @SuperGet({ route: '/' })
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
}
