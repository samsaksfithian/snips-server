const express = require('express');
const snipController = require('../controllers/snippets.controller');
const authorController = require('../controllers/authors.controller');

const router = express.Router();

// Home route
router.get('/', (request, response) => {
  // console.log(`We're in the router!`);
  response.send('Welcome to Snips!');
});

// API Home route
router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API!');
});

/* Snippets routes */
router.get('/api/snippets', snipController.getAllSnippets);
router.get('/api/snippets/:id', snipController.getSnippetById);
router.post('/api/snippets', snipController.createSnippet);
router.patch('/api/snippets/:id', snipController.updateSnippet);
router.delete('/api/snippets/:id', snipController.deleteSnippet);

/* Author routes */
router.get('/api/authors', authorController.getAllAuthors);
router.get('/api/login', authorController.logIn);
router.post('/api/signup', authorController.signUp);

module.exports = router;
