import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../logger';

const decodeJwtToken  = (token: string): JwtPayload | false => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded as JwtPayload;
    } catch (err) {
        logger.error(`[utils][auth][decodeJwtToken] Error: `);
        logger.error(err);
        return false;
    }
};

export default decodeJwtToken;