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

const START_AUTHORS_TEST = [
  { username: 'Emily', password: 'password' },
  { username: 'Dean', password: 'password' },
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

const START_SNIPPETS_TEST = [
  {
    code: '4 + 4',
    title: 'Addition',
    description: 'This is how you add',
    author: 'Dean',
    language: 'Algebra',
  },
  {
    code: 'console.log("Hello world!");',
    title: 'Hello World',
    description: 'My first program',
    author: 'Emily',
    language: 'javascript',
  },
];

/**
 * Calls queries using the DB connection. Drops the `snippets` and `authors` tables,
 * then recreates them using the standard columns.
 */
const createTables = () =>
  db.query(`DROP TABLE IF EXISTS snippets;
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
    );`);

/**
 * Deletes everything from the authors table and then inserts all of the
 * provided data (hashing the passwords in the process) into that table.
 *
 * Makes use of the Author.model `insert` function.
 * @param {Array<Object>} [author_seeds] an array of the author objects containing the
 * desired seed data
 */
const seedAuthors = async (author_seeds = START_AUTHORS) => {
  await db.query(`DELETE FROM authors`);
  const authorPromises = author_seeds.map(async author => {
    const hashedPass = await bcrypt.hash(author.password, HASH_SALT);
    return Author.insert({ username: author.username, password: hashedPass });
  });
  return Promise.all(authorPromises);
};

/**
 * Deletes everything from the snippets table and then inserts all of the
 * provided data into that table.
 *
 * Makes use of the Snippet.model `insert` function.
 * @param {Array<Object>} [snippet_seeds] an array of the snippet objects containing
 * the desired seed data
 */
const seedSnippets = async (snippet_seeds = START_SNIPPETS) => {
  await db.query(`DELETE FROM snippets`);
  return snippet_seeds.forEach(snippet => Snippet.insert(snippet));
};

/**
 * Calls the `createTables`, `seedAuthors`, and `seedSnippets` functions to fully
 * initialize the current database connection with base data.
 * @param {boolean} [testing] whether to init with testing data or not; defaults to false
 */
const init = async (testing = false) => {
  await createTables();
  await seedAuthors(testing ? START_AUTHORS_TEST : START_AUTHORS);
  await seedSnippets(testing ? START_SNIPPETS_TEST : START_SNIPPETS);
};

module.exports = {
  START_SNIPPETS,
  START_SNIPPETS_TEST,
  START_AUTHORS,
  START_AUTHORS_TEST,
  createTables,
  seedAuthors,
  seedSnippets,
  init,
};
