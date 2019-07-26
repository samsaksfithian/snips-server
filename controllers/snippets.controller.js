const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

// =================================================================
// =================================================================
// GET requests

exports.getAllSnippets = async (request, response, next) => {
  try {
    response.send(await Snippet.select(request.query));
  } catch (err) {
    next(err);
  }
};

exports.getSnippetById = async (request, response, next) => {
  try {
    const filtered = await Snippet.select({ id: request.params.id });
    if (filtered.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist', 404); // 404
    }
    response.send(filtered[0]);
  } catch (err) {
    next(err);
  }
};

// =================================================================
// =================================================================
// POST requests

exports.createSnippet = async (request, response, next) => {
  try {
    response.status(201).send(await Snippet.insert(request.body));
  } catch (err) {
    next(err);
  }
};

// =================================================================
// =================================================================
// PATCH requests

exports.updateSnippet = async (request, response, next) => {
  try {
    response.send(await Snippet.update(request.params.id, request.query));
  } catch (err) {
    next(err);
  }
};

// =================================================================
// =================================================================
// DELETE requests

exports.deleteSnippet = async (request, response, next) => {
  try {
    const deletedSnip = await Snippet.delete(request.params.id);
    response.send(deletedSnip);
  } catch (err) {
    next(err);
  }
};

// =================================================================
// =================================================================
