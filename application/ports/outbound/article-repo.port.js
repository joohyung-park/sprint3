/**
 * ArticleRepositoryPort
 *
 * Port interface for Article persistence operations.
 * This is the contract that any Article repository implementation must follow.
 *
 * In JavaScript, this is documentation-only since we don't have interfaces.
 * Any implementation should provide these methods with matching signatures.
 *
 * @interface
 */

/**
 * Find all articles with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {string} [options.keyword] - Search keyword for title/content
 * @param {string} [options.orderBy] - Sort order (asc/desc)
 * @param {number} [options.limit] - Max number of results
 * @param {number} [options.offset] - Number of results to skip
 * @returns {Promise<Article[]>} List of articles
 */
export async function findAll(options) {}

/**
 * Find a single article by ID
 * @param {string} id - Article ID
 * @returns {Promise<Article|null>} Article or null if not found
 */
export async function findById(id) {}

/**
 * Create a new article
 * @param {Article} article - Article entity to create
 * @returns {Promise<Article>} Created article with ID
 */
export async function create(article) {}

/**
 * Update an existing article
 * @param {string} id - Article ID
 * @param {Article} article - Updated article data
 * @returns {Promise<Article>} Updated article
 */
export async function update(id, article) {}

/**
 * Delete an article
 * @param {string} id - Article ID
 * @returns {Promise<void>}
 */
export async function deleteArticle(id) {}
