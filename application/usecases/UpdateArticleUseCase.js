export class UpdateArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(id, title, content) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new Error("Article not found");
    }

    article.update(title, content);
    return await this.articleRepository.update(id, article);
  }
}
