import { Controller, Post, Body, Get } from '@nestjs/common';
import { BlockchainService } from '../blockchain.service';
import { IpfsService } from '../ipfs.service';
import { LogService } from '../log.service';
import { CreateSupportTicketDto } from 'src/apis/tickets/dto/create-support-ticket.dto';

@Controller('blockchain')
export class BlockchainController {
    constructor(
        private readonly blockchainService: BlockchainService,
        private readonly ipfsService: IpfsService,
        private readonly logService: LogService,
    ) {}

    @Post('add')
    async addTransaction(@Body() data: CreateSupportTicketDto) {
        const block = this.blockchainService.addBlock(data);
        const ipfsResult = await this.ipfsService.uploadJSON(block);
        this.logService.appendLog({ ...block, ipfsUrl: ipfsResult.url });

        return {
            block,
            ipfsResult,
        };
    }

    @Get('chain')
    getChain() {
        return this.blockchainService.getChain();
    }

    @Get('logs')
    getLogs() {
        return this.logService.readLogs();
    }
}
