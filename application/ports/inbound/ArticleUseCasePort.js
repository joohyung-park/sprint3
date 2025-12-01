/**
 * Article Use Case Ports (Inbound/Driving Ports)
 *
 * These are the interfaces that the presentation layer uses to interact
 * with the application core. They define what the application can do.
 *
 * In JavaScript, this is documentation-only since we don't have interfaces.
 *
 * @interface
 */

/**
 * Get all articles with filtering and pagination
 * @param {Object} options - Query options
 * @returns {Promise<Article[]>}
 */
export async function getArticles(options) {}

/**
 * Get a single article by ID
 * @param {string} id - Article ID
 * @returns {Promise<Article|null>}
 */
export async function getArticleById(id) {}

/**
 * Create a new article
 * @param {string} title - Article title
 * @param {string} content - Article content
 * @returns {Promise<Article>}
 */
export async function createArticle(title, content) {}

/**
 * Update an existing article
 * @param {string} id - Article ID
 * @param {string} title - New title
 * @param {string} content - New content
 * @returns {Promise<Article>}
 */
export async function updateArticle(id, title, content) {}

/**
 * Delete an article
 * @param {string} id - Article ID
 * @returns {Promise<void>}
 */
export async function deleteArticle(id) {}
