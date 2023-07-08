import { Request } from 'express';

export interface IRequest extends Request {
    user?: any;     // FIXME: update type to user object from jwt
}