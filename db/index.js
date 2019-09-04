const pg = require('pg');

// how to reach my database
const connectionString = `postgresql://ssaksfithian:password@localhost:5432/snips`;
const client = new pg.Client(connectionString);

// opens a single connection to the database
client.connect();

client
  .query('SELECT * FROM snippets')
  .then(result => {
    // eslint-disable-next-line no-console
    console.table(result.rows);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });
