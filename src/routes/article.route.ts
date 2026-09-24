import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { Router } from "express";
import {
    getArticleById,
    getArticleComments,
    getArticles,
} from "../controllers/article.controller.ts";

const ArticleRouter = Router();

ArticleRouter.get("/", authMiddleware, getArticles);
ArticleRouter.get("/:id", authMiddleware, getArticleById);
ArticleRouter.get(
    "/:id/comments",
    authMiddleware,
    getArticleComments,
);

export default ArticleRouter;
