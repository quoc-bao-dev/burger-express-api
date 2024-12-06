import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import ApiError from '../core/ApiError';

const validateMiddleware = (validators: ValidationChain[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        // Chạy tất cả các validator
        for (const validator of validators) {
            const validation = validator.run(req);
            if (validation instanceof Promise) {
                await validation;
            }
        }

        // Kiểm tra lỗi sau khi chạy các validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((err: any) => ({
                path: err.path,
                message: err.msg,
            }));
            next(ApiError.validationFailed(formattedErrors));
        }

        // Tiếp tục xử lý nếu không có lỗi
        next();
    };
};

export default validateMiddleware;
