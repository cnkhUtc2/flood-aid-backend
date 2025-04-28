import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogService {
    private logFile = path.join(__dirname, '..', 'blockchain-log.json');

    appendLog(data: any) {
        const existing = fs.existsSync(this.logFile)
            ? JSON.parse(fs.readFileSync(this.logFile, 'utf-8'))
            : [];

        existing.push(data);

        fs.writeFileSync(this.logFile, JSON.stringify(existing, null, 2));
    }

    readLogs() {
        return fs.existsSync(this.logFile)
            ? JSON.parse(fs.readFileSync(this.logFile, 'utf-8'))
            : [];
    }
}
