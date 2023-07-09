import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const output = fs.createWriteStream('src/logs/info.log', { flags: 'a' });
const errorOutput = fs.createWriteStream('src/logs/error.log', { flags: 'a' });

const terminalLogging: boolean = process.env.TERMINAL_LOGGING ? process.env.TERMINAL_LOGGING === 'true' ? true : false : true;
const fileLogging: boolean = process.env.FILE_LOGGING ? process.env.FILE_LOGGING === 'true' ? true : false : true;
const timezone: string = process.env.TIMEZONE ? process.env.TIMEZONE : 'Asia/Kolkata';

const terminalLogger = new console.Console({ stdout: process.stdout, stderr: process.stderr });
const fileLogger = new console.Console({ stdout: output, stderr: errorOutput });

interface ILogger {
    error: (msg: string) => void;
    info: (msg: string) => void;
    success: (msg: string) => void;
    warn: (msg: string) => void;
};

const logger: ILogger = {
    error: (msg: string) => {
        if (terminalLogging) terminalLogger.error('\x1b[91m' + msg + '\x1b[0m'); // 91m = red
        if (fileLogging) fileLogger.error(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}][ERROR] ${msg}`);
    },
    info: (msg: string) => {
        if (terminalLogging) terminalLogger.info('\x1b[96m' + msg + '\x1b[0m');  // 96m = cyan
        if (fileLogging) fileLogger.info(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}][INFO] ${msg}`);
    },
    success: (msg: string) => {
        if (terminalLogging) terminalLogger.info('\x1b[92m' + msg + '\x1b[0m');  // 92m = green
        if (fileLogging) fileLogger.info(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}][SUCCESS] ${msg}`);
    },
    warn: (msg: string) => {
        if (terminalLogging) terminalLogger.warn('\x1b[93m' + msg + '\x1b[0m');  // 93m = yellow
        if (fileLogging) fileLogger.warn(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}][WARN] ${msg}`);
    }
};

export default logger;
