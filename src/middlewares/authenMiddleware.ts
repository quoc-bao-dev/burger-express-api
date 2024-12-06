import { NextFunction, Request, Response } from 'express';
import ApiError from '../core/ApiError';
import { isAccessTokenValid } from '../utils/auth-token.utils';

const authenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        throw ApiError.unauthorized();
    }

    if (!isAccessTokenValid(accessToken)) {
        throw ApiError.forbidden();
    }

    next();
};

export default authenMiddleware;
