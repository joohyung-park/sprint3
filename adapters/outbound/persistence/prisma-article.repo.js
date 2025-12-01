import { Article } from "../../../domain/article/Article.js";
import { prisma } from "./prisma/prisma.js";

class PrismaArticleRepository {
  async findAll(options = {}) {
    const { keyword, orderBy = "desc", limit, offset } = options;

    const findOptions = {
      orderBy: { created_at: orderBy },
    };

    if (keyword) {
      findOptions.where = {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      };
    }

    if (limit) {
      findOptions.take = limit;
    }

    if (offset) {
      findOptions.skip = offset;
    }

    const entities = await prisma.article.findMany(findOptions);
    return entities.map(this.toArticle);
  }

  async findById(id) {
    const entity = await prisma.article.findUnique({
      where: { id: BigInt(id) },
    });

    if (!entity) {
      return null;
    }

    return this.toArticle(entity);
  }

  async create(article) {
    const entity = await prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
      },
    });

    return this.toArticle(entity);
  }

  async update(id, article) {
    const entity = await prisma.article.update({
      where: { id: BigInt(id) },
      data: {
        title: article.title,
        content: article.content,
      },
    });

    return this.toArticle(entity);
  }

  async delete(id) {
    await prisma.article.delete({
      where: { id: BigInt(id) },
    });
  }

  toArticle(entity) {
    // DB에서 복원 - validation 불필요 (이미 검증된 데이터)
    return Article.reconstruct(
      entity.id.toString(),
      entity.title,
      entity.content,
      entity.created_at,
      entity.updated_at
    );
  }
}
const prismaArticleRepository = new PrismaArticleRepository();

export default prismaArticleRepository;
