const express = require('express');
const { logger, router, errorHandler } = require('./middleware');

const app = express();

/* Middleware */
app.use(express.json()); // parses requests with JSON payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Now start our app */
app.listen(process.env.PORT, () => {
  console.log(`Snips server running on port ${process.env.PORT}`);
});
