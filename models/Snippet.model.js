/* eslint-disable no-prototype-builtins */
const shortid = require('shortid');
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
    await setSnippetData(snippets);
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
    const filtered = snippets.filter(snippet => snippet.id !== id);
    if (filtered.length === snippets.length) return;
    await setSnippetData(filtered);
    return snippets.find(snippet => snippet.id === id);
  } catch (err) {
    console.error('ERROR deleting Snippet', err);
    throw err;
  }
};
