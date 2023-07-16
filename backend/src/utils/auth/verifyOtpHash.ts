import crypto from "crypto";
import logger from "../logger";

const verifyOtpHash = (otp: string, verifier: string, otpHash: string, callback: (err: string) => void) => {
    try {
        const [hash, expiryTime] = otpHash.split('.');

        if (Date.now() > parseInt(expiryTime, 10)) return callback('OTP expired');

        const message = `${otp}.${verifier}.${expiryTime}`;

        const newHash = crypto.createHmac('sha256', process.env.OTP_SECRET as string)
            .update(message)
            .digest('hex');

        if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(newHash))) return callback('Invalid OTP');

        return callback('');
    } catch (err) {
        logger.error(`[utils][auth][verifyOtpHash] Error verifying OTP hash:`);
        logger.error(err);
        return callback('Internal server error');
    }
};

export default verifyOtpHash;