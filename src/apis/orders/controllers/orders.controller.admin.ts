import { Body, Controller, Param, Query } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { SuperGet, SuperPut } from '@libs/super-core';
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

@Controller('orders')
@Resource('Orders')
@ApiTags('Front: Order')
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

    @SuperPut({ route: 'update/:id', dto: UpdateOrderGHNDto })
    @SuperAuthorize(PERMISSION.PUT)
    async createOne(
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
