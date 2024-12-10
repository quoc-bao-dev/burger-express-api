import { PaginationParams } from '../core/ApiResponseWithPagination';
import ApiResponse from '../core/ApiResponse';
import ApiResponseWithPagination from '../core/ApiResponseWithPagination';

export const createResponse = ({
    statusCode = 200,
    message = 'Successfully!',
    data,
}: {
    statusCode?: number;
    message?: string;
    data?: any;
}) => {
    return ApiResponse.create(statusCode, message, data);
};

export const createResponseWithPagination = ({
    statusCode = 200,
    message = 'Successfully!',
    data = null,
    pagination = {} as PaginationParams,
}: {
    statusCode?: number;
    message?: string;
    data?: any;
    pagination?: PaginationParams;
}) => {
    return ApiResponseWithPagination.createResponse(
        statusCode,
        message,
        data,
        pagination
    );
};
