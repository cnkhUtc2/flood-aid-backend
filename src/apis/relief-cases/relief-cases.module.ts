import { Module } from '@nestjs/common';
import { ReliefCasesService } from './relief-cases.service';
import { ExtendedMongooseModule } from '@libs/super-core/modules/mongoose/extended-mongoose.module';
import { COLLECTION_NAMES } from 'src/constants';
import { ReliefCase, ReliefCaseSchema } from './entities/relief-case.entity';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        ExtendedMongooseModule.forFeature([
            {
                name: COLLECTION_NAMES.RELIEF_CASE,
                schema: ReliefCaseSchema,
                entity: ReliefCase,
            },
        ]),
        MailModule,
    ],
    providers: [ReliefCasesService],
    exports: [ReliefCasesService],
})
export class ReliefCasesModule {}
