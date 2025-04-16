import { SeedsService } from './seeds.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/apis/users/user.module';
import { MetadataModule } from 'src/apis/metadata/metadata.module';
import { RolesModule } from '@libs/super-authorize/modules/roles/roles.module';
import { PermissionsModule } from '@libs/super-authorize/modules/permissions/permissions.module';
import { OrganizationFundsModule } from 'src/apis/organization-funds/organization-funds.module';
import { CategoriesModule } from 'src/apis/categories/categories.module';

@Module({
    imports: [
        RolesModule,
        UserModule,
        MetadataModule,
        PermissionsModule,
        OrganizationFundsModule,
        CategoriesModule,
    ],
    controllers: [],
    providers: [SeedsService],
    exports: [SeedsService],
})
export class SeedsModule {}
