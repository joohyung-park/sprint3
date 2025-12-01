export class GetArticleByIdUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(id) {
    return await this.articleRepository.findById(id);
  }
}
