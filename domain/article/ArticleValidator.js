export class ArticleValidator {
  static validateTitle(title) {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }
    if (title.length > 200) {
      throw new Error("Title must be less than 200 characters");
    }
  }

  static validateContent(content) {
    if (!content || content.trim().length === 0) {
      throw new Error("Content is required");
    }
    if (content.length > 10000) {
      throw new Error("Content must be less than 10000 characters");
    }
  }

  static validate(title, content) {
    this.validateTitle(title);
    this.validateContent(content);
  }
}
