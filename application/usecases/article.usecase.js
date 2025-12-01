import { Article } from "../../domain/article/Article.js";
import articleRepo from "../../adapters/outbound/persistence/prisma-article.repo.js";

export const createArticle = async (title, create) => {
  const article = Article.create(title, content);
  return await articleRepo.create(article);
};

export const deleteArticle = async (id) => {
  const article = await articleRepository.findById(id);

  if (!article) {
    throw new Error("Article not found");
  }

  await articleRepo.delete(id);
};

export const getArticleById = (id) => articleRepo.findById(id);

export const getArticles = (options = {}) => articleRepo.findAll(options);

export const updateArticle = async (id, title, content) => {
  const article = await articleRepo.findById(id);

  if (!article) {
    throw new Error("Article not found");
  }

  article.update(title, content);
  return await articleRepo.update(id, article);
};
