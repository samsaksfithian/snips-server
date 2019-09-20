const db = require('../db');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

const DB_TABLE = 'author';

/**
 * @typedef {Object} Author
 * @property {string} username
 * @property {string} password
 */

/**
 * Inserts a new author into the database
 * @param {Author} newAuthor the data to create the author with
 * @returns {Promise<Author>} the newly created author
 */
exports.insert = async ({ username, password }) => {
  try {
    if (!username || !password) {
      throw new ErrorWithHttpStatus('Missing properties', 400);
    }
    const result = await db.query(
      `INSERT INTO  ${DB_TABLE} (username, password)
      VALUES ($1, $2) RETURNING *`,
      [username, password],
    );
    return result.rows[0];
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Author Insert)');
  }
};

/**
 * Selects authors from db. Can accept optional username parameter to only
 * select a single author, otherwise returns all authors
 * @param {Object} [username] the parameters to filter by
 * @returns {Promise<Author[]>} array of authors matching the username parameter
 */
exports.select = async (username = '') => {
  try {
    const allAuthors = !username;
    const query = `SELECT * FROM ${DB_TABLE} ${allAuthors ? '' : 'WHERE username = $1'}`;
    const params = allAuthors ? undefined : [username];
    return (await db.query(query, params)).rows;
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Author Select)');
  }
};
