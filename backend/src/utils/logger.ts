import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const output = fs.createWriteStream('src/../../data/logs/info.log', { flags: 'a' });
const errorOutput = fs.createWriteStream('src/../../data/logs/errors.log', { flags: 'a' });

const terminalLogging: boolean = process.env.TERMINAL_LOGGING ? process.env.TERMINAL_LOGGING === 'true' ? true : false : true;
const fileLogging: boolean = process.env.FILE_LOGGING ? process.env.FILE_LOGGING === 'true' ? true : false : true;
const timezone: string = process.env.TIMEZONE ? process.env.TIMEZONE : 'Asia/Kolkata';
const suffix: string = process.env.LOGGER_SUFFIX ? process.env.LOGGER_SUFFIX : '[server]';

const terminalLogger = new console.Console({ stdout: process.stdout, stderr: process.stderr });
const fileLogger = new console.Console({ stdout: output, stderr: errorOutput });

interface IColorMap {
    [key: string]: string;
}
const colorMap: IColorMap = {
    'red': '\x1b[91m',
    'green': '\x1b[92m',
    'yellow': '\x1b[93m',
    'blue': '\x1b[94m',
    'magenta': '\x1b[95m',
    'cyan': '\x1b[96m',
    'white': '\x1b[97m',
    'reset': '\x1b[0m'
};

const log = (msg: any, color: keyof IColorMap, suffixMsg: string): void => {
    if (typeof msg === 'object') {
        const msgStr: string = JSON.stringify(msg, null, 4);
        const lines = msgStr.split('\n');
        lines.forEach(line => {
            if (terminalLogging) terminalLogger.log(`${colorMap[color]}${suffixMsg} ${line} ${colorMap.reset}`);
            if (fileLogging) fileLogger.info(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}]${suffixMsg} ${line}`);
        });
    } else {
        if (terminalLogging) terminalLogger.log(`${colorMap[color]}${suffixMsg}${/^\[.*\].*/.test(msg) ? '' : ' '}${msg} ${colorMap.reset}`);
        if (fileLogging) fileLogger.info(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}]${suffixMsg}${msg[0] === '[' ? '' : ' '}${msg}`);
    }
}

const logger = {
    error: (msg: any) => log(msg, 'red', suffix),
    info: (msg: any) => log(msg, 'cyan', suffix),
    success: (msg: any) => log(msg, 'green', suffix),
    warn: (msg: any) => log(msg, 'yellow', suffix)
};

export default logger;
