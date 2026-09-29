import "dotenv/config";

const isProduction = process.env.NODE_ENV == "prod";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 3600 * 1000,
    path: "/"
}
export default class ApiResponse{
    constructor(res, data = null, message = null, status = 200, cookies = [], clearCookie = false) {
        cookies.forEach(cookie => {
            res.cookie(cookie.name, cookie.value, cookieOptions)
        })

        if (clearCookie) {
            res.clearCookie('refresh_token', cookieOptions);
        }

        res.status(status).json({
            status: "success",
            data: data,
            message: message,
        })
    }
}
