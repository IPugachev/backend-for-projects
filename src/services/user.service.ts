import { prisma } from "../lib/prisma.ts";
import type {
    UserCreateInput,
    UserUpdateInput,
} from "../generated/prisma/models.ts";
import { AppError } from "../errors/app.error.ts";

class UserService {
    async getAll() {
        return prisma.user.findMany();
    }

    async getById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }

    async create(data: UserCreateInput) {
        return prisma.user.create({
            data,
        });
    }

    async update(id: number, data: UserUpdateInput) {
        return prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: number) {
        return prisma.user.delete({
            where: { id },
        });
    }
}
export const userService = new UserService();
