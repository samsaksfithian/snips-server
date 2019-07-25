const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 5555;

app.use(logger);
app.use(router);

app.listen(PORT, () => {
  console.log(`Snips server running on port ${PORT}`);
});
