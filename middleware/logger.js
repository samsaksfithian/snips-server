const fs = require('fs').promises;
const path = require('path');

function logger(request, response, next) {
  try {
    fs.appendFile(
      path.join(__dirname, '..', 'log.txt'),
      `${request.method} ${request.path} | ${Date.now()}\n`,
    );
  } catch (err) {
    console.error(err);
  } finally {
    // move on to the next piece of middleware
    next();
  }
}

module.exports = logger;
