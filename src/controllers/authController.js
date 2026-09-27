import * as authService from "../services/authService.js";
import ApiResponse from "../utils/apiResponse.js";

export async function register(req, res) {
    const { firstName, lastName, userName, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.register(firstName, lastName, userName, password);
    return new ApiResponse(res, { accessToken, user }, null, 201, [{ name: "refresh_token", value: refreshToken }]);
}

export async function login() {
    const { userName, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(userName, password);
    return new ApiResponse(res, { accessToken, user }, null, 200, [{ name: "refresh_token", value: refreshToken }]);
}

export function logout() {
    
}

export function refresh() {
    
}

export function reload() {
    
}