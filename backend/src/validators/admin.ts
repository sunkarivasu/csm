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

    // TODO: Improve password validation
    // password validation
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    } else if (req.body.password.length < 6 || req.body.password.length > 255) {
        errors = { ...errors, password: 'Password must be between 6 and 255 characters' };
    }

    // check if there are any errors
    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }

    next();
};

export {
    validateAdminRegistration
};