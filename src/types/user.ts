import type {
    UserGetPayload,
    UserSelect,
} from "../generated/prisma/models/User.ts";

export const userPublicSelect = {
    id: true,
    username: true,
    createdAt: true,
    articles: true,
} satisfies UserSelect;

export type PublicUser = UserGetPayload<{
    select: typeof userPublicSelect;
}>;
