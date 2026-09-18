import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../errors/app.error.ts";
import type {
    ChangeUserPasswordDto,
    CreateUserDto,
    UpdateUserDto,
} from "../../schemas/user.schema.ts";
import { userPublicSelect } from "../../types/user.ts";
import bcrypt from "bcrypt";

class UserService {
    async getAllUsers() {
        return prisma.user.findMany({
            select: userPublicSelect,
        });
    }

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: userPublicSelect,
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }

    async createUser(dto: CreateUserDto) {
        const user = await prisma.user.findUnique({
            where: {
                username: dto.username,
            },
        });

        if (user) {
            throw new AppError(
                "Username already exists",
                409,
            );
        }

        const hashedPassword = await bcrypt.hash(
            dto.password,
            10,
        );
        const data = {
            username: dto.username,
            password: hashedPassword,
        };

        return prisma.user.create({
            data,
            select: userPublicSelect,
        });
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        return prisma.user.update({
            where: {
                id,
            },
            data: dto,
            select: userPublicSelect,
        });
    }
    async changePassword(
        id: number,
        dto: ChangeUserPasswordDto,
    ) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: { password: true },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isValid = await bcrypt.compare(
            dto.oldPassword,
            user.password,
        );

        if (!isValid) {
            throw new AppError(
                "Invalid current password",
                400,
            );
        }

        const hashedPassword = await bcrypt.hash(
            dto.newPassword,
            10,
        );

        await prisma.user.update({
            where: {
                id,
            },
            data: { password: hashedPassword },
        });
    }

    async deleteUser(id: number) {
        await this.getUserById(id);

        await prisma.user.delete({
            where: { id },
        });
    }
}

export const userService = new UserService();
