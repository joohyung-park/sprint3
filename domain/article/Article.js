import { ArticleValidator } from "./ArticleValidator.js";

export class Article {
  // Private constructor pattern (JS에서는 주석으로 표시)
  // ⚠️ 외부에서 new Article() 직접 호출 금지!
  // Article.create() 또는 Article.reconstruct()만 사용할 것
  constructor(id, title, content, createdAt, updatedAt = null) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Factory method - 새 Article 생성 (validation 포함)
  static create(title, content) {
    ArticleValidator.validate(title, content);
    return new Article(null, title, content, new Date());
  }

  // Factory method - DB에서 복원 (validation 없음, 이미 검증된 데이터)
  static reconstruct(id, title, content, createdAt, updatedAt = null) {
    return new Article(id, title, content, createdAt, updatedAt);
  }

  // 도메인 메서드 - Article 수정
  update(title, content) {
    ArticleValidator.validate(title, content);
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }
}
