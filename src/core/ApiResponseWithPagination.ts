import ApiResponse from './ApiResponse';

export interface PaginagtionParams {
    total: number;
    limit: number;
    page: number;
    pages: number;
}

class ApiResponseWithPagination<T> extends ApiResponse<T> {
    pagination: {
        total: number;
        limit: number;
        page: number;
        pages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    constructor(
        statusCode: number,
        message: string,
        data: T,
        pagination: PaginagtionParams
    ) {
        super(statusCode, message, data);
        this.pagination = {
            ...pagination,
            hasNextPage: pagination.page < pagination.pages,
            hasPreviousPage: pagination.page > 1,
        };
    }

    static createResponse<P>(
        statusCode: number,
        message: string,
        data: P,
        pagination: {
            total: number;
            limit: number;
            page: number;
            pages: number;
        }
    ) {
        return new ApiResponseWithPagination(
            statusCode,
            message,
            data,
            pagination
        );
    }
}

export default ApiResponseWithPagination;
