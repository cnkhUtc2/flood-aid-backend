import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockchainService {
    private chain: Block[] = [];

    constructor() {
        this.chain.push(this.createGenesisBlock());
    }

    createGenesisBlock(): Block {
        return {
            index: 0,
            timestamp: new Date().toISOString(),
            data: 'Genesis Block',
            previousHash: '0',
            hash: this.generateHash(
                0,
                'Genesis Block',
                '0',
                new Date().toISOString(),
            ),
        };
    }

    generateHash(
        index: number,
        data: any,
        previousHash: string,
        timestamp: string,
    ): string {
        const blockString = `${index}${timestamp}${JSON.stringify(data)}${previousHash}`;
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    addBlock(data: any): Block {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock: Block = {
            index: this.chain.length,
            timestamp: new Date().toISOString(),
            data,
            previousHash: lastBlock.hash,
            hash: '',
        };
        newBlock.hash = this.generateHash(
            newBlock.index,
            newBlock.data,
            newBlock.previousHash,
            newBlock.timestamp,
        );
        this.chain.push(newBlock);
        return newBlock;
    }

    getChain(): Block[] {
        return this.chain;
    }
}
