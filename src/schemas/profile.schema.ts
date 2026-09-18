import { z } from "zod";

export const updateProfileSchema = z
    .object({
        first: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 20 символов"),
        last: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 20 символов"),
        age: z.number().gte(0).lte(110),
        city: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 20 символов"),
        currency: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(3, "Максимум 30 символов"),
        country: z
            .string()
            .min(2, "Минимум 2 символа")
            .max(30, "Максимум 30 символов"),
    })
    .partial();
export type UpdateProfileDto = z.infer<
    typeof updateProfileSchema
>;
