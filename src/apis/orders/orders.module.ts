import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Order, OrderSchema } from './entities/order.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.ORDER,
                schema: OrderSchema,
                entity: Order,
            },
        ]),
        HttpModule,
    ],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
