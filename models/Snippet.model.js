/* eslint-disable no-prototype-builtins */
const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
const db = require('../db');
// const { getSnippetData, setSnippetData } = require('../utils/db.utils');

const DB_TABLE = 'snippets';

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/**
 * Inserts a new snippet into the database
 * @param {Snippet} newSnippet the data to create the snippet with
 * @returns {Promise<Snippet>} the newly created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language) {
      throw new ErrorWithHttpStatus('Missing properties', 400);
    }
    const result = await db.query(
      `INSERT INTO  ${DB_TABLE} (author, code, title, description, language)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [author, code, title, description, language],
    );
    return result.rows[0];
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Snippet Insert)');
  }
};

/**
 * Selects snippets from db. Can accept optional query object
 * to filter results, otherwise returns all snippets.
 * @param {Object} [query] the parameters to filter by
 * @returns {Promise<Snippet[]>} array of snippets matching the filter query params
 */
exports.select = async (query = {}) => {
  try {
    if (Object.keys(query).length === 0) {
      const all = await db.query(`SELECT * FROM ${DB_TABLE} ORDER BY id`);
      return all.rows;
    }

    const filter = Object.keys(query)
      .reduce((acc, _, i) => `${acc} %I = $${i + 1} AND`, '')
      .slice(0, -3);
    // const filter = `${Object.keys(query)
    //   .map((_, i) => `%I = $${i + 1}`)
    //   .join(' AND ')}`;
    // let filter = '';
    // for (let index = 1; index <= Object.keys(query).length; index++) {
    //   filter += index !== 1 ? ` AND %I = $${index}` : `%I = $${index}`;
    // }
    const formattedSelect = format(
      `SELECT * FROM ${DB_TABLE} WHERE ${filter} ORDER BY id`,
      ...Object.keys(query),
    );
    const result = await db.query(formattedSelect, Object.values(query));
    return result.rows;
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Snippet Select)');
  }
};

/**
 * Updates a snippet from the database based on the passed-in id
 * with the passed in data
 * @param {string} id the id of the snippet to update
 * @param {Snippet} updates subset of values to update
 * @returns {Promise<Snippet>} updated snippet
 */
exports.update = async (id, updates) => {
  try {
    const { author, code, title, description, language } = updates;
    const result = await db.query(
      `UPDATE ${DB_TABLE} SET 
        author = COALESCE($2, author),
        code = COALESCE($3, code),
        title = COALESCE($4, title),
        description = COALESCE($5, description),
        language=COALESCE($6, language)
      WHERE id = ($1) RETURNING *`,
      [id, author, code, title, description, language],
    );
    return result.rows[0];
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Snippet Update)');
  }
};

/**
 * Deletes a snippet from the database based on the passed-in id
 * @param {string} id the id of the snippet to delete
 * @returns {Promise<Snippet>} deleted snippet
 */
exports.delete = async id => {
  try {
    return db.query(`DELETE FROM snippets WHERE id = ${id}`);
  } catch (err) {
    // console.error(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error (Snippet Delete)');
  }
};
