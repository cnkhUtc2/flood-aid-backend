import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './controllers/profiles.controller';

@Module({
    controllers: [ProfilesController],
    providers: [ProfilesService],
})
export class ProfilesModule {}
