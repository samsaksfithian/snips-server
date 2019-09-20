require('dotenv').config();
const pg = require('pg');

// create a pg Pool object
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

module.exports = pool;
