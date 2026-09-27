import 'dotenv/config';
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export function getAccessToken(payload, expiry = "10s") {
    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: expiry})
} 

export function getRefreshToken(payload, expiry = "7d") {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: expiry})
}

export function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        return decoded;
    }
    catch (err) {
        return null;
    }
}

export function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, REFRESH_SECRET);
        return decoded;
    }
    catch (err) {
        return null;
    }
}

export function getRefreshTokenExpiry() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
}