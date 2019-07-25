const fs = require('fs').promises;
const path = require('path');

async function logger(request, response, next) {
  try {
    await fs.appendFile(
      path.join(__dirname, '..', 'log.txt'),
      `${request.method} ${request.path} | ${Date.now()}\n`,
    );
  } catch (err) {
    console.error(err);
  } finally {
    next(); // move on to the next piece of middleware
  }
}

module.exports = logger;
