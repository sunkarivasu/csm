import crypto from 'crypto';

const generateOtp = (minDigits: number = 6, maxDigits: number = 6): string => {
    return crypto.randomInt(10 ** (minDigits - 1), 10 ** maxDigits).toString();
};

export default generateOtp;