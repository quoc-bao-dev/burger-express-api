import { NextFunction, Request, Response } from 'express';

const wrapAsync =
    (
        handler: (
            req: Request,
            res: Response,
            next?: NextFunction
        ) => Promise<void> | Promise<Response<any, Record<string, any>>>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export default wrapAsync;
