import { verifyToken } from "../lib/jwt.ts";
import type {
    NextFunction,
    Request,
    Response,
} from "express";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const token = authHeader.replace("Bearer ", "");

    req.user = verifyToken(token);

    next();
}
