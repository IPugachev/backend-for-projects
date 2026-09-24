import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../errors/app.error.ts";

class ArticleService {
    async getArticles(id: number) {
        return prisma.article.findMany({
            where: {
                authorId: id,
            },
        });
    }
    async getArticleById(id: number) {
        const article = await prisma.article.findUnique({
            where: {
                id,
            },
        });
        if (!article) {
            throw new AppError(`Article is not found`, 404);
        }

        return article;
    }
}

export const articleService = new ArticleService();
