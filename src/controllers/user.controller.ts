import type { Request, Response } from "express";
import { userService } from "../services/userService/user.service.ts";

export async function getMe(req: Request, res: Response) {
    const userId = req.user.id;
    const users = await userService.getUserById(userId);
    res.json(users);
}

export async function getUsers(
    req: Request,
    res: Response,
) {
    const users = await userService.getAllUsers();
    res.json(users);
}

export async function getUserById(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);

    res.json(user);
}

export async function createUser(
    req: Request,
    res: Response,
) {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
}

export async function updateUser(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    const user = await userService.updateUser(id, req.body);

    res.json(user);
}
export async function changePassword(
    req: Request,
    res: Response,
) {
    const userId = req.user.id;
    const user = await userService.changePassword(
        userId,
        req.body,
    );

    res.json(user);
}

export async function deleteUser(
    req: Request,
    res: Response,
) {
    const id = Number(req.params.id);
    await userService.deleteUser(id);

    res.status(204).json({
        message: "User successfully deleted",
    });
}
