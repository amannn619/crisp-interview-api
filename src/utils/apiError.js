export default class ApiError extends Error{
    constructor(message, statusCode = 500, error = null) {
        super(message);
        this.name = "API_ERROR";
        this.statusCode = statusCode;
        this.error = error;
        Error.captureStackTrace(this, this.constructor)
    }
}