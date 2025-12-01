import { prisma } from "../../prisma/prisma.js";
import { PrismaArticleRepository } from "../outbound/persistence/PrismaArticleRepository.js";
import { GetArticlesUseCase } from "../../application/usecases/GetArticlesUseCase.js";
import { GetArticleByIdUseCase } from "../../application/usecases/GetArticleByIdUseCase.js";
import { CreateArticleUseCase } from "../../application/usecases/CreateArticleUseCase.js";
import { UpdateArticleUseCase } from "../../application/usecases/UpdateArticleUseCase.js";
import { DeleteArticleUseCase } from "../../application/usecases/DeleteArticleUseCase.js";

export function setupDependencies() {
  const articleRepository = new PrismaArticleRepository(prisma);

  const getArticlesUseCase = new GetArticlesUseCase(articleRepository);
  const getArticleByIdUseCase = new GetArticleByIdUseCase(articleRepository);
  const createArticleUseCase = new CreateArticleUseCase(articleRepository);
  const updateArticleUseCase = new UpdateArticleUseCase(articleRepository);
  const deleteArticleUseCase = new DeleteArticleUseCase(articleRepository);

  return {
    getArticlesUseCase,
    getArticleByIdUseCase,
    createArticleUseCase,
    updateArticleUseCase,
    deleteArticleUseCase,
  };
}
