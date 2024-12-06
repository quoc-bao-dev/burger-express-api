import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode,
        message: err.message,
        errors: err?.errors,
    });
};

export default errorHandler;
