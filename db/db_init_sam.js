const bcrypt = require('bcrypt');
const db = require('.');
const Snippet = require('../models/Snippet.model');
const Author = require('../models/Author.model');

const HASH_SALT = 3;

const START_AUTHORS = [
  { username: 'Andrew', password: 'lilbean69' },
  { username: 'Glen', password: 'wioasdWKS!#$g89781!@&SK' },
  { username: 'Scott', password: 'aPowerShiftIsComingIn321' },
  { username: 'Ivy', password: 'isitlunchtimeyet?' },
  { username: 'Kevin', password: 'igottacopsomemoreshoes,bro' },
];

const START_SNIPPETS = [
  {
    code: 'const independence = 1776',
    title: 'freedome',
    description: 'I made a declaration of independence',
    author: 'Andrew',
    language: 'Javascript',
  },
  {
    code: 'console.log("Hello world!");',
    title: 'Hello World',
    description: 'My first program',
    author: 'Glen',
    language: 'javascript',
  },
  {
    code: 'int myVar = 4;',
    title: 'int.cpp',
    description: 'How to declare an int variable in C++',
    author: 'Scott',
    language: 'c++',
  },
  {
    code: '<-- an html comment -->',
    title: 'comment.html',
    description: 'How to write comments in HTML',
    author: 'Ivy',
    language: 'html',
  },
];

async function init() {
  await db.query(
    `DROP TABLE IF EXISTS snippets;
    DROP TABLE IF EXISTS authors;
    CREATE TABLE authors (username TEXT PRIMARY KEY, password TEXT);
    CREATE TABLE snippets (
      id SERIAL PRIMARY KEY,
      code TEXT,
      title TEXT,
      description TEXT,
      favorites INT DEFAULT 0,
      author TEXT REFERENCES authors,
      language TEXT
    );`,
  );

  const authorPromises = START_AUTHORS.map(async author => {
    const hashedPass = await bcrypt.hash(author.password, HASH_SALT);
    return Author.insert({ username: author.username, password: hashedPass });
  });
  await Promise.all(authorPromises);
  START_SNIPPETS.forEach(snippet => Snippet.insert(snippet));
}

init();
