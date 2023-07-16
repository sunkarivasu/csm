import fs from "fs";
import { NextFunction } from "express";
import { IRequest, IResponse } from "src/interfaces/vendor";
import logger from "../utils/logger";

const output = fs.createWriteStream('src/../../data/logs/requests.log', { flags: 'a' });
const timezone: string = process.env.TIMEZONE ? process.env.TIMEZONE : 'Asia/Kolkata';

const fileLogger = new console.Console({ stdout: output, stderr: output });

const reqLogger = (req: IRequest, res: IResponse, next: NextFunction) => {
    fileLogger.info(`[${new Date().toLocaleString('en-US', { hour12: false, timeZone: timezone })}] [${req.ip}] [${req.method}] ${req.originalUrl}`);

    next();
};

export default reqLogger;