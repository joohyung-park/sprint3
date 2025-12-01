import { Article } from "../../domain/article/Article.js";

export class CreateArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(title, content) {
    const article = Article.create(title, content);
    return await this.articleRepository.create(article);
  }
}
