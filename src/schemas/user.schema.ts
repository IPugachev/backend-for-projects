import { z } from "zod";

export const createUserSchema = z
    .object({
        username: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 30 символов"),
        password: z
            .string()
            .min(4, { message: "Минимум 4 символа" })
            .max(20, { message: "Максимум 20 символов" })
            .refine((val) => /[A-Z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть заглавной",
            })
            .refine((val) => /[a-z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть строчной",
            })
            .refine((val) => /[0-9]/.test(val), {
                message:
                    "Хотя бы одна цифра должна присутствовать",
            }),
    })
    .strict();

export const updateUserSchema = z
    .object({
        username: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 30 символов"),
    })
    .partial()
    .strict();

export const changeUserPasswordSchema = z
    .object({
        oldPassword: z
            .string()
            .min(4, { message: "Минимум 4 символа" })
            .max(20, { message: "Максимум 20 символов" })
            .refine((val) => /[A-Z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть заглавной",
            })
            .refine((val) => /[a-z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть строчной",
            })
            .refine((val) => /[0-9]/.test(val), {
                message:
                    "Хотя бы одна цифра должна присутствовать",
            }),
        newPassword: z
            .string()
            .min(4, { message: "Минимум 4 символа" })
            .max(20, { message: "Максимум 20 символов" })
            .refine((val) => /[A-Z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть заглавной",
            })
            .refine((val) => /[a-z]/.test(val), {
                message:
                    "Хотя бы одна буква должна быть строчной",
            })
            .refine((val) => /[0-9]/.test(val), {
                message:
                    "Хотя бы одна цифра должна присутствовать",
            }),
    })
    .strict();

export const userIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateUserDto = z.infer<
    typeof createUserSchema
>;

export type UpdateUserDto = z.infer<
    typeof updateUserSchema
>;
export type ChangeUserPasswordDto = z.infer<
    typeof changeUserPasswordSchema
>;
