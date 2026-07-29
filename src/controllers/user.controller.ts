import type { Request, Response } from "express";
import { userService } from "../services/user.service.ts";
import { AppError } from "../errors/app.error.ts";

export function getUsers(req: Request, res: Response) {
    const users = userService.getAll();
    res.json(users);
}

export function getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.json(user);
}
export function createUser(req: Request, res: Response) {
    const user = userService.create(req.body);

    res.status(201).json(user);
}

export function updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = userService.update(id, req.body);

    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.json(user);
}
export function deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = userService.delete(id);

    if (!deleted) {
        throw new AppError("User not found", 404);
    }

    res.status(204).json({
        message: "User successfully deleted",
    });
}
