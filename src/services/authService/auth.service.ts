import type { RegisterLoginDto } from "../../schemas/auth.schema.ts";
import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../errors/app.error.ts";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/jwt.ts";

class AuthService {
    async register(dto: RegisterLoginDto) {
        const existingUser = await this.findUserByUsername(
            dto.username,
        );
        if (existingUser) {
            throw new AppError(
                "Username already exists",
                409,
            );
        }

        const hashedPassword = await bcrypt.hash(
            dto.password,
            10,
        );

        const user = await prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
                profile: {
                    create: {},
                },
            },

            omit: {
                password: true,
            },
        });

        const token = generateToken({
            id: user.id,
        });

        return { token };
    }

    async login(dto: RegisterLoginDto) {
        const existingUser = await this.findUserByUsername(
            dto.username,
        );

        if (!existingUser) {
            throw new AppError("User not found", 404);
        }

        const isValid = await bcrypt.compare(
            dto.password,
            existingUser.password,
        );

        if (!isValid) {
            throw new AppError("Wrong password", 404);
        }
        const token = generateToken({
            id: existingUser.id,
        });

        return { token };
    }

    private async findUserByUsername(username: string) {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
}
export const authService = new AuthService();
