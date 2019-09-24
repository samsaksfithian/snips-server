/* eslint-disable function-paren-newline */
const bcrypt = require('bcrypt');
const db = require('.');

exports.createTables = () =>
  db.query(
    `DROP TABLE IF EXISTS snippets;
    DROP TABLE IF EXISTS authors;
    --
    CREATE TABLE authors (name TEXT PRIMARY KEY, password TEXT);
    CREATE TABLE snippets (
      id SERIAL PRIMARY KEY,
      code TEXT,
      title TEXT,
      description TEXT,
      favorites INT DEFAULT 0,
      -- establish snippet-author relationship
      author TEXT REFERENCES authors,
      language TEXT
    );`,
  );

exports.seedAuthors = () =>
  db.query(`DELETE FROM authors`).then(() =>
    db.query(
      `-- Seed author data
      INSERT INTO
        authors (name, password)
      VALUES
        ('Dandy', $1),
        ('Scott', $1);`,
      [bcrypt.hashSync('password', 2)],
    ),
  );

exports.seedSnippets = () =>
  db.query(`DELETE FROM snippets`).then(() =>
    db.query(
      `-- Seed snippet data
      INSERT INTO
        snippets (code, title, description, language, author)
      VALUES
        (
          'const america = 1776',
          'freedom',
          'I declared a const',
          'JavaScript',
          'Dandy'
        ),
        (
          '4 + 4',
          'addition',
          'This is how you add',
          'Algebra',
          'Scott'
      );`,
    ),
  );
