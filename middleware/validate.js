const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  if (!request.headers.authorization) {
    response.send(401);
    return;
  }
  // 1. get the token
  const [type, token] = request.headers.authorization.split(' ');

  try {
    if (type !== 'Bearer') throw new Error();
    // 2. verify it
    jwt.verify(token, process.env.JWT_SECRET);
    // move on if good
    next();
  } catch (err) {
    // else die if bad
    response.send(401);
  }
};
