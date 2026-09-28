import ApiError from "../utils/apiError.js"
import { verifyAccessToken } from "../utils/jwthelper.js";

export default function authHandler(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        throw new ApiError("Unauthorized: Missing or invalid token format.", 401);
    }

    const accessToken = verifyAccessToken(authHeader.split(" ")[1]);
    
    if (accessToken.expired) {
        throw new ApiError("TOKEN_EXPIRED", 401);
    }
    
    if (!accessToken.valid || !accessToken.payload || !accessToken.payload.id) {
        throw new ApiError("Unauthorized: Missing or invalid token format.", 401);
    }

    req.id = accessToken.payload.id;

    next();
}