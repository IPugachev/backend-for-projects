import type { Request, Response } from "express";
import { articleService } from "../services/articleService/article.service.ts";
import { commentService } from "../services/commentService/comment.service.ts";

export async function getArticles(
    req: Request,
    res: Response,
) {
    const userId = req.user.id;
    const articles =
        await articleService.getArticles(userId);
    res.json(articles);
}
export async function getArticleById(
    req: Request,
    res: Response,
) {
    const articleId = Number(req.params.id);
    const article =
        await articleService.getArticleById(articleId);

    res.json(article);
}

export async function getArticleComments(
    req: Request,
    res: Response,
) {
    const articleId = Number(req.params.id);

    const comments =
        await commentService.getArticleComments(articleId);
    const commentsWithUserAvatar = comments.map(
        (comment) => {
            const { profile, ...rest } = comment.user;

            return {
                ...comment,
                userAvatar: comment.user?.profile?.avatar,
                user: rest,
            };
        },
    );

    res.json(commentsWithUserAvatar);
}
