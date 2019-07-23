const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

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

const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');

const getSnippetData = async () => {
  try {
    return JSON.parse(await fs.readFile(dbpath));
  } catch (err) {
    console.error('ERROR: failed to get snippet data');
    throw err;
  }
};

/**
 * Inserts a new snippet into the database
 * @param {Snippet} newSnip the data to create the snippet with
 * @returns {Promise<Snippet>} the newly created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    const snippets = await getSnippetData();
    if (!author || !code || !title || !description || !language) {
      throw Error('missing properties when attempting to create new snippet');
    }
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    await fs.writeFile(dbpath, JSON.stringify(snippets));
    return snippets[snippets.length - 1];
  } catch (err) {
    console.error('ERROR: problem inserting snippet', err);
    throw err;
  }
};

/**
 * Selects snippets from db. Can accept optional query object to filter results.
 * @param {Object} [query] the parameters to filter by
 * @returns {Promise<Snippet[]>} array of snippets matching the filter query params
 */
exports.select = async (query = {}) => {
  try {
    const snippets = await getSnippetData();
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => snippet[key] === query[key]),
    );
    return filtered;
  } catch (err) {
    console.error('ERROR in Snippet model', err);
    throw err;
  }
};

/* Update  */

/* Delete */
