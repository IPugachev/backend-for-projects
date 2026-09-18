import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../errors/app.error.ts";

import type { Profile } from "../../generated/prisma/client.ts";
import type { ProfileUncheckedCreateInput } from "../../generated/prisma/models/Profile.ts";
import type { UpdateProfileDto } from "../../schemas/profile.schema.ts";

class ProfileService {
    async getProfile(id: number) {
        const profile = await prisma.profile.findUnique({
            where: {
                userId: id,
            },
            include: {
                avatar: true,
            },
        });
        if (!profile) {
            throw new AppError("Profile not found", 404);
        }

        return profile;
    }
    async createUserProfile(
        data: ProfileUncheckedCreateInput,
    ): Promise<Profile> {
        return prisma.profile.create({ data });
    }
    async updateProfile(
        userId: number,
        dto: UpdateProfileDto,
    ) {
        return prisma.profile.update({
            where: {
                userId,
            },
            data: dto,
            include: {
                avatar: true,
            },
        });
    }
}

export const profileService = new ProfileService();
