import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStatic } from 'passport';
import logger from '../utils/logger';

import Admin from '../models/admin';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export default (passport: PassportStatic) => {
    passport.use(new Strategy(opts, async (payload, done) => {
        try {
            if (payload.role === 'admin' || payload.role === 'super_admin') {
                const admin = await Admin.findById(payload.id);
                if (admin && admin.allow_password_change === true) {
                    return done(null, false);
                }
                if (admin) {
                    return done(null, {
                        id: admin._id,
                        name: admin.name,
                        email: admin.email,
                        role: admin.role
                    });
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        } catch (err) {
            logger.error(`[config][passport-jwt] Error: `);
            logger.error(err);
            return done(err, false);
        }
    }));
};

