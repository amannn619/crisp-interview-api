import * as authService from "../services/authService.js";
import ApiResponse from "../utils/apiResponse.js";

export async function register(req, res) {
    const { firstName, lastName, userName, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.register(firstName, lastName, userName, password);
    return new ApiResponse(res, { accessToken, user }, null, 201, [{ name: "refresh_token", value: refreshToken }]);
}

export async function login(req, res) {
    const { userName, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(userName, password);
    return new ApiResponse(res, { accessToken, user }, null, 200, [{ name: "refresh_token", value: refreshToken }]);
}

export async function logout(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token;
        await authService.logout(req.id, refreshToken);
        return new ApiResponse(res, null, "Logged out", 200, [], true);
    }
    catch (error) {
        error.clearCookie = true;
        next(error);
    }
}

export async function refresh(req, res) {
    const refreshToken = req.cookies.refresh_token;

    const { accessToken, newRefreshToken } = await authService.refresh(refreshToken);
    return new ApiResponse(res, {accessToken}, null, 201, [{name: "refresh_token", value: newRefreshToken}])
}

export async function reload(req, res) {
    const refreshToken = req.cookies.refresh_token;
    const accessToken = await authService.reload(refreshToken);
    return new ApiResponse(res, {accessToken}, null, 201)
}