export class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true; // useful to identify trusted errors

        Error.captureStackTrace(this, this.constructor);
    }
}
