import { Body, Controller } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { SuperPost } from '@libs/super-core';
import { PERMISSION, Resource, SuperAuthorize } from '@libs/super-authorize';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Me } from 'src/decorators/me.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders')
@Resource('Orders')
@ApiTags('Front: Order')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @SuperPost({ route: 'create', dto: CreateOrderDto })
    @SuperAuthorize(PERMISSION.POST)
    async createOne(@Body() body: CreateOrderDto, @Me() user: UserPayload) {
        const result = await this.ordersService.createOrder(body, user);
        return result;
    }
}
