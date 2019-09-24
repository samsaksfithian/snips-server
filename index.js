require('dotenv').config();
const app = require('./app');

/* Now start our app */
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Snips server running on port ${process.env.PORT}`);
});
