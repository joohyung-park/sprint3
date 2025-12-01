export class DeleteArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(id) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new Error("Article not found");
    }

    await this.articleRepository.delete(id);
  }
}
