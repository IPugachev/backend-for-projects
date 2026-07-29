import { z } from "zod";

export const createUserSchema = z
    .object({
        name: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 30 символов"),
        email: z.email("Некорректный email"),
    })
    .strict();

export const updateUserSchema = createUserSchema
    .partial()
    .strict();

export const userIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});
