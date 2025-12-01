import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

// 게시글 목록 조회 API를 만들어 주세요.
// todo: offset 방식의 페이지네이션 기능을 포함해 주세요.

router.get("/", (req, res, next) =>
  Promise.resolve(getFindOptionFrom(req))
    .then(prisma.article.findMany)
    .then((entities) => entities.map(Article.fromEntity))
    .then((articles) => res.json(articles))
    .catch((err) => {
      console.error(err);
      next(err);
    })
);

router.post("/", (req, res) =>
  Promise.resolve({
    title: req.body.title,
    content: req.body.content,
  })
    .then((info) => prisma.article.create({ data: info }))
    .then(Article.fromEntity)
    .then((article) => res.status(201).json(article))
    .catch((err) => {
      console.error(err);
      next(err);
    })
);

router.get("/:id", (req, res) =>
  Promise.resolve(
    prisma.article.findUniqueOrThrow({
      where: { id: req.params.id },
    })
  )
    .then(Article.fromEntity)
    .then((article) => res.json(article))
    .catch((err) => {
      console.error(err);
      next(err);
    })
);

export default router;

// id, title, content, createdAt를 조회합니다.
class Article {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

  static fromEntity(entity) {
    return new Article(
      entity.id.toString(),
      entity.title,
      entity.content,
      entity.created_at
    );
  }
}

function getFindOptionFrom(req) {
  const findOption = {
    // 최신순(recent)으로 정렬할 수 있습니다.
    orderBy: { created_at: "desc" },
  };
  if (req.query.keyword) {
    findOption.where = {
      // title, content에 포함된 단어로 검색할 수 있습니다.
      OR: [
        { title: { contains: req.query.keyword } },
        { content: { contains: req.query.keyword } },
      ],
    };
  }
  return findOption;
}
