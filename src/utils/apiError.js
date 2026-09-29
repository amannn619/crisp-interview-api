export default class ApiError extends Error{
    constructor(message, statusCode = 500, error = null, clearCookie = false) {
        super(message);
        this.name = "API_ERROR";
        this.statusCode = statusCode;
        this.error = error;
        this.clearCookie = clearCookie;
        Error.captureStackTrace(this, this.constructor)
    }
}