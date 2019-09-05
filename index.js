const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { logger, router, errorHandler } = require('./middleware');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // parses requests with JSON payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Now start our app */
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Snips server running on port ${process.env.PORT}`);
});
