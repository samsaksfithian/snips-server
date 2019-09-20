DROP TABLE IF EXISTS snippets;
DROP TABLE IF EXISTS author;
--
CREATE TABLE author (username TEXT PRIMARY KEY, password TEXT);
--
CREATE TABLE snippets (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT REFERENCES author,
  -- establishes snippet-author connection/relationship
  language TEXT
);
-- Seed author data
INSERT INTO
  author (username, password)
VALUES
  ('Andrew', 'lilbean69'),
  ('Glen', 'wioasdWKS!#$g89781!@&SK'),
  ('Scott', 'aPowerShiftIsComingIn321'),
  ('Ivy', 'isitlunchtimeyet?'),
  ('Kevin', 'igottacopsomemoreshoes,bro');
-- Seed snippets with data
INSERT INTO
  snippets (code, title, description, author, language)
VALUES
  (
    'const independence = 1776',
    'freedome',
    'I made a declaration of independence',
    'Andrew',
    'Javascript'
  ),
  (
    'console.log("Hello world!");',
    'Hello World',
    'My first program',
    'Glen',
    'javascript'
  ),
  (
    'int myVar = 4;',
    'int.cpp',
    'How to declare an int variable in C++',
    'Scott',
    'c++'
  ),
  (
    '<-- an html comment -->',
    'comment.html',
    'How to write comments in HTML',
    'Ivy',
    'html'
  );