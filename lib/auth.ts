import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;
export const ADMIN_COOKIE_NAME = "ashabi_admin_session";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function verifyAdminCredentials(
    username: string,
    password: string
) {
    if (username !== ADMIN_USERNAME) {
        return false;
    }
    return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function createAdminToken() {
    return await new SignJWT({
        type: "admin",
    })
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verifyAdminToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);

        console.log("JWT payload:", payload);

        return (
            payload.type === "admin" &&
            typeof payload.exp === "number"
        );
    } catch (error) {
        console.error("JWT verification failed:", error);
        return false;
    }
}

export const ADMIN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};