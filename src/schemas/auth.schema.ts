import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(20, "Максимум 20 символов"),
    password: z
        .string()
        .min(4)
        .max(100)
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
});

export type RegisterLoginDto = z.infer<
    typeof registerSchema
>;
