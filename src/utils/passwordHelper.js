import "dotenv/config";
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

export async function hash(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}