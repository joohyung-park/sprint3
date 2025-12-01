import express from "express";
import * as articleUseCases from "../../../../application/usecases/article.usecase.js";

export function createArticleRouter() {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const { keyword, limit, offset } = req.query;

      const options = {
        keyword,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
        orderBy: "desc",
      };

      const articles = await articleUseCases.getArticles(options);
      res.json(articles);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const article = await articleUseCases.createArticle(title, content);
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await articleUseCases.getArticleById(id);

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const article = await articleUseCases.updateArticle(id, title, content);
      res.json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await articleUseCases.deleteArticle(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  return router;
}
