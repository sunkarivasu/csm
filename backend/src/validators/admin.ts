import { isEmpty, trimReqBody } from '../utils/validators';
import { NAME_REGEX, EMAIL_REGEX } from '../utils/regexes';

// Interfaces
import { NextFunction } from 'express';
import { IRequest, IResponse } from 'src/interfaces/vendor';

const validateAdminRegistration = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // name validation
    if (isEmpty(req.body.name)) {
        errors = { ...errors, name: 'Name is required' };
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors = { ...errors, name: 'Name is invalid' };
    } else if (req.body.name.length <3 || req.body.name.length > 255) {
        errors = { ...errors, name: 'Name must be between 3 and 255 characters' };
    }

    // email validation
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // TODO: do better validation
    // password validation
    if (!isEmpty(req.body.password) && (req.body.password.length < 8 || req.body.password.length > 255)) {
        errors = { ...errors, password: 'Password must be between 8 and 255 characters' };
    }

    // allow_password_change validation
    if (req.body.allow_password_change && typeof req.body.allow_password_change !== 'boolean') {
        errors = { ...errors, allow_password_change: 'Please provide valid data' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const validateAdminLogin = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // email validation
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // password validation
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const validateUpdatePassword = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // password validation  TODO: do better validation
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    } else if (req.body.password.length < 8 || req.body.password.length > 255) {
        errors = { ...errors, password: 'Password must be between 8 and 255 characters' };
    }

    // check token
    if (isEmpty(req.headers.authorization)) {
        errors = { ...errors, token: 'Token is required' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const validateForgotPassword = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // email validation
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const validateOtp = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // Email Validation
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // OTP Validation
    if (isEmpty(req.body.otp)) {
        errors = { ...errors, otp: 'OTP is required' };
    }

    // OTP Hash validation
    if (isEmpty(req.body.otp_hash)) {
        errors = { ...errors, otp_hash: 'OTP hash is required' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const validateResetPassword = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = trimReqBody(req.body);

    // Email Validation
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // Password Validation  TODO: do better validation
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    } else if (req.body.password.length < 8 || req.body.password.length > 255) {
        errors = { ...errors, password: 'Password must be between 8 and 255 characters' };
    }

    // OTP Validation
    if (isEmpty(req.body.otp)) {
        errors = { ...errors, otp: 'OTP is required' };
    }

    // OTP Hash validation
    if (isEmpty(req.body.otp_hash)) {
        errors = { ...errors, otp_hash: 'OTP hash is required' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

const isSuperAdmin = (req: IRequest, res: IResponse, next: NextFunction) => {
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    next();
};

export {
    validateAdminRegistration,
    validateAdminLogin,
    validateUpdatePassword,
    validateForgotPassword,
    validateOtp,
    validateResetPassword,
    isSuperAdmin
};