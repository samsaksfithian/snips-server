const fs = require('fs').promises;
const path = require('path');

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

/* Create */

/* Read  */
/**
 * Selects snippets from db. Can accept optional query object to filter results.
 * @param {Object} [query] the parameters to filter by
 * @returns {Promise<Object[]>}
 */
exports.select = async (query = {}) => {
  try {
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => snippet[key] === query[key]),
    );
    return filtered;
  } catch (err) {
    console.log('ERROR in Snippet model');
    throw err;
  }
};

/* Update  */

/* Delete */
