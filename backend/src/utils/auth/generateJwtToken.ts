import jwt, { Secret } from 'jsonwebtoken';
import logger from '../logger';

const generateJwtToken = (payload: object) => new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        process.env.JWT_SECRET as Secret,
        { expiresIn: process.env.JWT_EXPIRE },
        (err, token) => {
            if (err) {
                logger.error(`[utils][auth][generateJwtToken] Error generating JWT token:`);
                logger.error(err);
                return reject({ msg: 'Internal server error', err, status: 500 });
            }
            return resolve(`Bearer ${token}`);
        }
    );
});

export default generateJwtToken;