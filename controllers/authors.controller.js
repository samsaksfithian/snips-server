const bcrypt = require('bcrypt');
const Author = require('../models/Author.model');

const HASH_SALT = 3;

exports.signUp = async (request, response, next) => {
  try {
    const hashedPass = await bcrypt.hash(request.body.password, HASH_SALT);
    response.status(201).send(
      await Author.insert({
        username: request.body.username,
        password: hashedPass,
      }),
    );
  } catch (err) {
    next(err);
  }
};

exports.logIn = async (request, response, next) => {
  try {
    if (!request.body.username || !request.body.password) {
      response.status(400).send('Missing username or password');
    }
    const user = (await Author.select(request.body.username))[0];
    const match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      response.status(200).send('Successfully logged in!');
    } else {
      response.status(400).send('Incorrect password');
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllAuthors = async (request, response, next) => {
  try {
    response.send(await Author.select(request.query.username));
  } catch (err) {
    next(err);
  }
};
