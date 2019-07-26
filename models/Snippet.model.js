/* eslint-disable no-prototype-builtins */
const shortid = require('shortid');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
const { getSnippetData, setSnippetData } = require('../utils/db.utils');

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
    const snippets = await getSnippetData();
    if (!author || !code || !title || !description || !language) {
      throw new ErrorWithHttpStatus(
        'Missing properties when attempting to create new snippet',
        400,
      );
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
    await setSnippetData(snippets);
    return snippets[snippets.length - 1];
  } catch (err) {
    // console.error('ERROR: problem inserting snippet', err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
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
    const snippets = await getSnippetData();
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => snippet[key] === query[key]),
    );
    return filtered;
  } catch (err) {
    // console.error('ERROR in Snippet model', err);
    throw new ErrorWithHttpStatus('Database error');
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
    const snippets = await getSnippetData();
    let editedSnippet = {};
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;
      editedSnippet = snippet;
      Object.keys(updates).forEach(key => {
        if (key in snippet) snippet[key] = updates[key];
        // TODO: maybe error if key doesn't exist?
      });
      return snippet;
    });
    await setSnippetData(updatedSnippets);
    return editedSnippet;
  } catch (err) {
    console.error('ERROR deleting Snippet', err);
    throw err;
  }
};

/**
 * Deletes a snippet from the database based on the passed-in id
 * @param {string} id the id of the snippet to delete
 * @returns {Promise<Snippet>} deleted snippet
 */
exports.delete = async id => {
  try {
    const snippets = await getSnippetData();
    const index = snippets.findIndex(snippet => snippet.id === id);
    // short circuit if id not found
    if (index < 0) return;
    // TODO: maybe error here?
    const deleted = snippets.splice(index, 1)[0];
    await setSnippetData(snippets);
    return deleted;
  } catch (err) {
    console.error('ERROR deleting Snippet', err);
    throw err;
  }
};
