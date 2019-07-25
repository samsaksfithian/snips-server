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

// API Home route
router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API!');
});

router.get('/api/snippets', async (request, response) => {
  response.send(await Snippet.select());
});

router.get('/api/snippets/:id', (request, response) => {
  response.send('Received get request for specific snippet');
});

// =================================================================
// =================================================================
// POST requests

router.post('/api/snippets', (request, response) => {
  response.send(request.body);
});

// =================================================================
// =================================================================
// PATCH requests

router.patch('/api/snippets/:id', (request, response) => {
  response.send('Received patch request');
});

// =================================================================
// =================================================================
// DELETE requests

router.delete('/api/snippets/:id', (request, response) => {
  response.send('Received delete request');
});

// =================================================================
// =================================================================

module.exports = router;
