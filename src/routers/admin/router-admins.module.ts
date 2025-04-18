import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserControllerAdmin } from 'src/apis/users/controllers/user.controller.admin';
import { AuthModule } from 'src/apis/auth/auth.module';
import { AuthControllerAdmin } from 'src/apis/auth/controllers/auth.controller.admin';
import { CategoriesModule } from 'src/apis/categories/categories.module';
import { CategoriesControllerAdmin } from 'src/apis/categories/controllers/categories.controller.admin';
import { MediaControllerAdmin } from 'src/apis/media/controllers/medias.controller.admin';
import { MediaModule } from 'src/apis/media/medias.module';
import { MetadataControllerAdmin } from 'src/apis/metadata/controllers/metadata.controller.admin';
import { MetadataModule } from 'src/apis/metadata/metadata.module';
import { PostsControllerAdmin } from 'src/apis/posts/controllers/posts.controller.admin';
import { PostsModule } from 'src/apis/posts/posts.module';
import { UserModule } from 'src/apis/users/user.module';
import { CommonModule } from 'src/common/common.module';
import { DonationItemsControllerAdmin } from 'src/apis/donation-items/controllers/donation-items.controller.admin';
import { DonationItemsModule } from 'src/apis/donation-items/donation-items.module';
import { ReliefCasesModule } from 'src/apis/relief-cases/relief-cases.module';
import { ReliefCasesControllerAdmin } from 'src/apis/relief-cases/controllers/relief-cases.controller.admin';
import { OrdersModule } from 'src/apis/orders/orders.module';
import { OrdersControllerAdmin } from 'src/apis/orders/controllers/orders.controller.admin';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        CommonModule,
        UserModule,
        MediaModule,
        AuthModule,
        CategoriesModule,
        PostsModule,
        MetadataModule,
        DonationItemsModule,
        ReliefCasesModule,
        OrdersModule,
    ],
    controllers: [
        MediaControllerAdmin,
        AuthControllerAdmin,
        CategoriesControllerAdmin,
        PostsControllerAdmin,
        MetadataControllerAdmin,
        UserControllerAdmin,
        DonationItemsControllerAdmin,
        ReliefCasesControllerAdmin,
        OrdersControllerAdmin,
    ],
    providers: [],
})
export class RouterAdminsModule {}
