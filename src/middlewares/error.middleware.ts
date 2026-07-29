import type {
    NextFunction,
    Request,
    Response,
} from "express";
import { AppError } from "../errors/app.error.ts";
import { ZodError } from "zod";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: err.issues,
        });
    }

    if (err instanceof AppError) {
        return res
            .status(err.status)
            .json({ message: err.message });
    }

    console.log("error.middleware log:", err.message);
    return res.status(500).json({
        message: err.message,
    });
}
