import type { Request, Response } from "express";
import { userService } from "../services/user.service.ts";

export function getUsers(req: Request, res: Response) {
    const users = userService.getAll();
    res.json(users);
}

export function getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });

        return;
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
        res.status(404).json({
            message: "User not found",
        });

        return;
    }
    res.json(user);
}
export function deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = userService.delete(id);

    if (!deleted) {
        res.status(404).json({
            message: "User not found",
        });

        return;
    }
    res.status(204).send();
}
