import express from "express";

export function createArticleRouter(useCases) {
  const router = express.Router();
  const {
    getArticlesUseCase,
    getArticleByIdUseCase,
    createArticleUseCase,
    updateArticleUseCase,
    deleteArticleUseCase,
  } = useCases;

  router.get("/", async (req, res, next) => {
    try {
      const { keyword, limit, offset } = req.query;

      const options = {
        keyword,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
        orderBy: "desc",
      };

      const articles = await getArticlesUseCase.execute(options);
      res.json(articles);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const article = await createArticleUseCase.execute(title, content);
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await getArticleByIdUseCase.execute(id);

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
      const article = await updateArticleUseCase.execute(id, title, content);
      res.json(article);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteArticleUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  return router;
}
