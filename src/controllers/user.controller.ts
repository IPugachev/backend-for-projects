import type { Request, Response } from "express";
import { userService } from "../services/user.service.ts";

export async function getUsers(
    req: Request,
    res: Response,
) {
    const users = await userService.getAll();
    res.json(users);
}

export async function getUserById(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    const user = await userService.getById(id);

    res.json(user);
}
export async function createUser(
    req: Request,
    res: Response,
) {
    const user = await userService.create(req.body);

    res.status(201).json(user);
}

export async function updateUser(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    const user = await userService.update(id, req.body);

    res.json(user);
}
export async function deleteUser(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    await userService.delete(id);

    res.status(204).json({
        message: "User successfully deleted",
    });
}
