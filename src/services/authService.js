import { getAccessToken, getRefreshToken, getRefreshTokenExpiry, verifyRefreshToken } from "../utils/jwthelper.js"
import prisma from "./db.js";
import { hash, compare } from "../utils/passwordHelper.js";
import ApiError from "../utils/apiError.js";

export async function register(firstName, lastName, userName, password) {
    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashedPassword,
        },
        omit: {
            password: true
        }
    });
    const accessToken = getAccessToken({ id: user.id });
    const refreshToken = getRefreshToken({ id: user.id });

    await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken: refreshToken,
            expiresAt: getRefreshTokenExpiry()
        }
    });
    return { user, accessToken, refreshToken };
}

export async function login(userName, password) {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            userName: userName
        }
    });

    if (await compare(password, user.password)) {
        const accessToken = getAccessToken({ id: user.id })
        const refreshToken = getRefreshToken({ id: user.id })

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken: refreshToken,
                expiresAt: getRefreshTokenExpiry()
            }
        });

        const { password, ...userDetails } = user;
        return { user: userDetails , accessToken, refreshToken };
    }
    throw new ApiError("Invalid Credentials", 401)
}

export async function logout(userId, refreshToken) {
    if (!refreshToken) {
        return
    }

    const session = await prisma.session.findUnique({
        where: {refreshToken: refreshToken}
    })

    if (!session) {
        return
    }

    if (session.revoked) {
        await prisma.session.updateMany({
            where: { userId: userId },
            data: {revoked: true}
        })
    }
    else {
        await prisma.session.update({
            where: { refreshToken: refreshToken },
            data: {revoked: true}
        })
    }

}

export async function refresh(refreshToken) {
    if (!refreshToken) {
        throw new ApiError("Invalid input", 401, null, true);
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        throw new ApiError("Invalid token", 401, null, true);
    }

    const session = await prisma.session.findUnique({
        where: { refreshToken: refreshToken }
    })

    if (!session || session.expiresAt < new Date()) {
        throw new ApiError("Invalid token", 401, null, true);
    }

    if (session.revoked) {
        await prisma.session.updateMany({
            where: { userId: session.userId },
            data: {revoked: true}
        })

        throw new ApiError("Compromised token", 401, null, true);
    }
    
    await prisma.session.update({
        where: { refreshToken: refreshToken },
        data: {revoked: true}
    })
    const newRefreshToken = getRefreshToken({id: session.userId});
    const accessToken = getAccessToken({id: session.userId});

    await prisma.session.create({
        data: {
            userId: session.userId,
            refreshToken: newRefreshToken,
            expiresAt: getRefreshTokenExpiry(),
        }
    })
    return { accessToken, newRefreshToken };

}

export async function reload(refreshToken) {
    if (!refreshToken) {
        throw new ApiError("Token missing", 401, null, true);
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        throw new ApiError("Invalid token", 401, null, true);
    }

    const accessToken = getAccessToken({id: payload.id});
    return accessToken;
}
