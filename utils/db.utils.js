const fs = require('fs').promises;
const path = require('path');

const dbPath = filename => path.join(__dirname, '..', 'db', `${filename}.json`);

/**
 * Reads and parses JSON data from the snippets database file
 * @returns {Promise<Snippet>} the parsed contents of the file
 */
exports.getSnippetData = () => this.readJsonFromDb('snippets');

/**
 * Writes given data to the snippets database file
 * @param {Object} data the data object to be written to the file
 * @returns {Promise<string>} the stringified results that were written to the file
 */
exports.setSnippetData = data => this.writeJsonToDb('snippets', data);

/**
 * Reads and parses JSON data from a given database file
 * @param {string} filename the name of the database file to access, without extension
 * @returns {Promise} the parsed contents of the file
 */
exports.readJsonFromDb = async filename => {
  try {
    return JSON.parse(await fs.readFile(dbPath(filename)));
  } catch (err) {
    console.error('ERROR: failed to get snippet data');
    throw err;
  }
};

/**
 * Writes given data to a given JSON database file
 * @param {string} filename the name of the database file, without extension
 * @param {Object} data the data object to be written to the file
 * @returns {Promise<string>} the stringified results that were written to the file
 */
exports.writeJsonToDb = async (filename, data) => {
  try {
    const stringData = JSON.stringify(data);
    await fs.writeFile(dbPath(filename), stringData);
    return stringData;
  } catch (err) {
    console.error('ERROR: failed to set snippet data');
    throw err;
  }
};
