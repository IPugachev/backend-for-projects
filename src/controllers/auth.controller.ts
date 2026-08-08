import type { Request, Response } from "express";
import type { RegisterLoginDto } from "../schemas/auth.schema.ts";
import { authService } from "../services/auth.service.ts";

export async function register(
    req: Request,
    res: Response,
) {
    const dto = req.body as RegisterLoginDto;

    const result = await authService.register(dto);

    res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
    const dto = req.body as RegisterLoginDto;

    const result = await authService.login(dto);

    res.json(result);
}
