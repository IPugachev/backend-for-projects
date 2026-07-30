import type {
    NextFunction,
    Request,
    Response,
} from "express";
import { AppError } from "../errors/app.error.ts";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.ts";

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

    if (
        err instanceof Prisma.PrismaClientKnownRequestError
    ) {
        switch (err.code) {
            case "P2025":
                return res.status(404).json({
                    message: "User not found",
                });

            case "P2002":
                return res.status(409).json({
                    message: "Email already exists",
                });
        }
    }

    console.log("error.middleware log:", err);
    return res.status(500).json({
        message: err.message,
    });
}
