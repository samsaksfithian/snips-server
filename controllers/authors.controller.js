const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

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
    const author = (await Author.select(request.body.username))[0];
    if (!author) throw new ErrorWithHttpStatus('User does not exist', 404);
    const isMatch = await bcrypt.compare(request.body.password, author.password);
    if (!isMatch) throw new ErrorWithHttpStatus('Incorrect password', 401);

    const token = jwt.sign(author.username, process.env.JWT_SECRET);
    response.status(200).send({ message: 'Successfully logged in!', token });
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
