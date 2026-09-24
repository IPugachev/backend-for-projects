import { prisma } from "../../lib/prisma.ts";

class CommentService {
    async getArticleComments(articleId: number) {
        return prisma.comment.findMany({
            where: {
                articleId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile: {
                            select: {
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
    }
}

export const commentService = new CommentService();
