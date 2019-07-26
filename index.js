const express = require('express');
const { logger, router, errorHandler } = require('./middleware');

const app = express();
const PORT = 5555;

/* Middleware */
app.use(express.json()); // parses requests with JSON payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Now start our app */
app.listen(PORT, () => {
  console.log(`Snips server running on port ${PORT}`);
});
