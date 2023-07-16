import crypto from 'crypto';
import logger from '../logger';

const generateOtpHash = (otp: string, verifier: string, expiryTimeInSeconds: number = 300): string => {
    try {
        const expiryTime = Date.now() + expiryTimeInSeconds * 1000;

        const message = `${otp}.${verifier}.${expiryTime}`;

        return crypto.createHmac('sha256', process.env.OTP_SECRET as string)
            .update(message)
            .digest('hex') + '.' + expiryTime;
    } catch (err) {
        logger.error(`[utils][auth][generateOtpHash] Error generating OTP hash:`);
        logger.error(err);
        throw err;
    }
};

export default generateOtpHash;