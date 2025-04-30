import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { IpfsService } from './ipfs.service';
import { LogService } from './log.service';
import { BlockchainController } from './controllers/blockchain.controller';

@Module({
    controllers: [BlockchainController],
    providers: [BlockchainService, IpfsService, LogService],
    exports: [BlockchainService, IpfsService, LogService],
})
export class BlockchainModule {}
