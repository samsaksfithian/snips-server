const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

// =================================================================
// =================================================================
// GET requests

exports.getAllSnippets = async (request, response) => {
  response.send(await Snippet.select());
};

exports.getSnippetById = async (request, response) => {
  try {
    const filtered = await Snippet.select({ id: request.params.id });
    if (filtered.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist', 404); // 404
    }
    response.send(filtered[0]);
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) {
      response.status(err.status).send(err.message);
    }
    response.status(500).send('Server error');
  }
};

// =================================================================
// =================================================================
// POST requests

exports.createSnippet = async (request, response) => {
  try {
    response.status(201).send(await Snippet.insert(request.body));
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) {
      response.status(err.status).send(err.message);
    }
    response.status(500).send('Server error');
  }
};

// =================================================================
// =================================================================
// PATCH requests

exports.updateSnippet = async (request, response) => {
  response.send(await Snippet.select());
};

// =================================================================
// =================================================================
// DELETE requests

exports.deleteSnippet = async (request, response) => {
  try {
    const deletedSnip = await Snippet.delete(request.params.id);
    response.send(deletedSnip);
  } catch (err) {
    console.error(err);
  }
};

// =================================================================
// =================================================================
