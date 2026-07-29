import type { Request, Response } from "express";
import { authService } from "../services/auth.service.ts";

export async function test(req: Request, res: Response) {
    try {
        const result = await authService.test("test");

        res.json({
            result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
}
