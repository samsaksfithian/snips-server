const express = require('express');
const cors = require('cors');
const { logger, router, errorHandler } = require('./middleware');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // parses requests with JSON payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

module.exports = app;
