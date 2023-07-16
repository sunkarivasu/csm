import { Router } from 'express';
const router = Router();
import passport from 'passport';
import {
    registerAdmin,
    loginAdmin,
    updateAdminPassword,
    forgotPassword,
    resetAdminPassword,
    verifyOtp,
} from '../controllers/admin';
// Interfaces
import { IRequest, IResponse } from 'src/interfaces/vendor';
import {
    IUpdateAdminPassword,
    IAdminLogin,
    IAdminRegistration,
    IResetAdminPassword
} from 'src/interfaces/controllers/admin';
// Validators
import {
    validateAdminRegistration,
    validateAdminLogin,
    validateUpdatePassword,
    validateForgotPassword,
    validateOtp,
    validateResetPassword,
    isSuperAdmin
} from '../validators/admin';


// route    :: POST /api/admin/register
// access   :: Super Admin
// desc     :: Admin registration
router.post(
    '/register',
    passport.authenticate('jwt', { session: false }),
    isSuperAdmin,
    validateAdminRegistration,
    (req: IRequest, res: IResponse) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password || '',
            allow_password_change: req.body.allow_password_change || false
        } as IAdminRegistration;

        registerAdmin(data)
            .then(admin => res.json({ msg: `Admin registered. Instructions are mailed to respective user`, data: { admin } }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// route    :: POST /api/admin/login
// access   :: public
// desc     :: Admin login
router.post(
    '/login',
    validateAdminLogin,
    (req: IRequest, res: IResponse) => {
        const data = {
            email: req.body.email,
            password: req.body.password
        } as IAdminLogin;

        loginAdmin(data)
            .then(token => res.json({ msg: `Admin logged in`, data: { token} }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// route    :: GET /api/admin/update-password
// access   :: public
// desc     :: Update admin password
router.post(
    '/update-password',
    validateUpdatePassword,
    (req: IRequest, res: IResponse) => {
        const data = {
            password: req.body.password,
            token: req.headers.authorization
        } as IUpdateAdminPassword;

        updateAdminPassword(data)
            .then(token => res.json({ msg: `Admin logged in`, data: { token} }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// route    :: POST /api/admin/forgot-password
// access   :: public
// desc     :: Send password reset link to admin
router.post(
    '/forgot-password',
    validateForgotPassword,
    (req: IRequest, res: IResponse) => {
        forgotPassword(req.body.email)
            .then(hash => res.json({ msg: `Password reset link sent to ${req.body.email}`, data: { hash } }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);

// route    :: POST /api/admin/reset-password
// access   :: public
// desc     :: Reset admin password
router.post(
    '/reset-password',
    validateResetPassword,
    (req: IRequest, res: IResponse) => {
        const data = {
            email: req.body.email,
            password: req.body.password,
            otp: req.body.otp,
            otpHash: req.body.otp_hash
        } as IResetAdminPassword;

        resetAdminPassword(data)
            .then(token => res.json({ msg: `Admin logged in`, data: { token} }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);


export default router;