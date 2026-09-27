import { getAccessToken, getRefreshToken, getRefreshTokenExpiry } from "../utils/jwthelper.js"
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