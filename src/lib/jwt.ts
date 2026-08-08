import jwt from "jsonwebtoken";

export interface JwtPayload {
    id: number;
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d",
    });
}
export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
