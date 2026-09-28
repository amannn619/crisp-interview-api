export default function errorHandler(err, req, res, next) {
    let errorStatusCode = 500;
    let errorMessage = err.message || "Invalid Server Error"
    let errorDetails = err.error || null;
    
    if (err.name == "API_ERROR") {
        errorStatusCode = err.statusCode;
    }

    if (err.name == "ZodError") {
        errorStatusCode = 400;
        errorMessage = "Invalid Input";
        errorDetails = err.flatten();
    }

    if (err.name == "PrismaClientKnownRequestError") {
        if (err.code == "P2025") {
            errorStatusCode = 404;
            errorMessage = "Record Not Found";
            errorDetails = null;
        }

        if (err.code == "P2002") {
            errorStatusCode = 409;
            errorMessage = "Record Already Exists";
            errorDetails = null;
        }
    }

    return res.status(errorStatusCode).json({
        status: "error",
        message: errorMessage,
        error: errorDetails
    })

}