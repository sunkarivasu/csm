import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";
dotenv.config();


const config = (): void => {
    let MONGO_URI: string;
    let MONGO_ENV: string;

    if (process.env.NODE_ENV !== 'production') {
        MONGO_URI = process.env.MONGO_URI_DEV ? process.env.MONGO_URI_DEV : 'mongodb://127.0.0.1:27017/csm';
        MONGO_ENV = process.env.MONGO_URI_DEV ? (process.env.MONGO_ENV_DEV ? process.env.MONGO_ENV_DEV : '') : 'local';
    } else {
        MONGO_URI = process.env.MONGO_URI_PROD ? process.env.MONGO_URI_PROD : '';
        MONGO_ENV = process.env.MONGO_ENV_PROD ? process.env.MONGO_ENV_PROD : '';
    }

    mongoose.connect(MONGO_URI)
        .then(() => logger.info(`[mongoDB][${MONGO_ENV}] Database connected successfully`))
        .catch(err => {
            logger.error(`[mongoDB][${MONGO_ENV}] Database connection failed :: ${err}`);
            setTimeout(() => process.exit(1), 1);
        });
};

export default config;