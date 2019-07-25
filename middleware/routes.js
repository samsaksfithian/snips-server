const express = require('express');
const Snippet = require('../models/Snippet.model');

const router = express.Router();

// =================================================================
// =================================================================
// GET requests

// Home route
router.get('/', (request, response) => {
  // console.log(`We're in the router!`);
  response.send('Welcome to Snips!');
});

// =================================================================

// API Home route
router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API!');
});

// =================================================================

router.get('/api/snippets', async (request, response) => {
  const snippets = await Snippet.select();
  response.send(snippets);
});

// =================================================================

router.get('/api/snippets/:id', (request, response) => {});

// =================================================================
// =================================================================
// POST requests

router.post('/api/snippets', (request, response) => {});

// =================================================================
// =================================================================
// PATCH requests

router.patch('/api/snippets/:id', (request, response) => {});

// =================================================================
// =================================================================
// DELETE requests

router.delete('/api/snippets/:id', (request, response) => {});

// =================================================================
// =================================================================

module.exports = router;
