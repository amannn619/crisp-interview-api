export default function errorHandler(err, req, res, next) {
    if (err.name == "API_ERROR") {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            error: err.error
        })
    }
    return res.status(500).json({
        status: "error",
        message: err.message,
        error: err.error
    })

}