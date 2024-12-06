class ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    constructor(statusCode: number, message: string, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    static create(
        statusCode: number,
        message: string = 'Successfuly!',
        data = null
    ) {
        return new ApiResponse(statusCode, message, data);
    }
}

export default ApiResponse;
