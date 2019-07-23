const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select({ author: 'Scott', language: 'javascript' });
  const snippets = await Snippet.select({ id: '1' });
  console.log(snippets);
}

testModels();
