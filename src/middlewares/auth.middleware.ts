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
    const authToken = req.cookies.token;

    if (!authToken) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = verifyToken(authToken);

    next();
}
