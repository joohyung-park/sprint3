export class GetArticlesUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(options = {}) {
    return await this.articleRepository.findAll(options);
  }
}
