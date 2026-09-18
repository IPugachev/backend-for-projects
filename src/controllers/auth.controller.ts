import type { Request, Response } from "express";
import type { RegisterLoginDto } from "../schemas/auth.schema.ts";
import { authService } from "../services/authService/auth.service.ts";

export async function register(
    req: Request<unknown, unknown, RegisterLoginDto>,
    res: Response,
) {
    const dto = req.body;

    const { token } = await authService.register(dto);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.MODE === "production",
        sameSite: "lax",
    });

    res.status(201).end();
}

export async function login(req: Request, res: Response) {
    const dto = req.body as RegisterLoginDto;

    const { token } = await authService.login(dto);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.MODE === "production",
        sameSite: "lax",
    });

    res.status(200).end();
}

export async function logout(req: Request, res: Response) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.MODE === "production",
        sameSite: "lax",
    });

    res.status(204).end();
}
