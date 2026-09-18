import type { Request, Response } from "express";
import { imageService } from "../services/avatarService/image.service.ts";
import { profileService } from "../services/profileService/profile.service.ts";

export async function getProfile(
    req: Request,
    res: Response,
) {
    const userId = req.user.id;
    const profile = await profileService.getProfile(userId);
    res.json(profile);
}

export async function updateProfile(
    req: Request,
    res: Response,
) {
    const userId = req.user.id;
    const profile = await profileService.updateProfile(
        userId,
        req.body,
    );

    res.json(profile);
}

export const changeAvatar = async (
    req: Request,
    res: Response,
) => {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).json({
            message: "File is required",
        });
    }

    const image = await imageService.uploadAvatar(
        userId,
        req.file.buffer,
    );
    res.json(image);
};
