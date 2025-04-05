import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { Profile, ProfileSchema } from './entities/profile.entity';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.PROFILE,
                schema: ProfileSchema,
                entity: Profile,
            },
        ]),
    ],
    controllers: [],
    providers: [ProfilesService],
    exports: [ProfilesService],
})
export class ProfilesModule {}
