export default class CustomError extends Error {
    constructor(
        public code: StatusCodes = 404,
        public message: string = 'No information.',
    ) {
        super(message);
        this.code = code;
    }
}

export type StatusCodes =
    // 2xx
    200 | // OK
    201 | // Created
    204 | // No Content

    // 4xx
    400 | // Bad Request
    401 | // Unauthorized
    404 | // Not Found
    409 | // Conflict

    // 5xx
    500 // Internal Server Error
    ;