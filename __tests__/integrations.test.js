/* eslint-disable no-console */
require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const dbInit = require('../db/db_init');

beforeAll(async () => {
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', () => {
  describe('GET /api/snippets', () => {
    it('should get all of the snippets', async () => {
      // test the /api/snippets route
      const response = await request(app).get('/api/snippets');
      expect(response.body.length).toBe(2);
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
      expect(response.body).toMatchSnapshot();
    });
  });
});

afterAll(() => {
  // close the db pool
  db.end();
});
