const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select({ author: 'Scott', language: 'javascript' });
  // const snippets = await Snippet.select({ id: '1' });
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'Kevin',
      code: 'something that needs refactoring',
      title: 'badname.js',
      description: 'good code, I think!',
    });
    console.log(newSnippet);
  } catch (err) {
    console.error(err);
  }
}

testModels();
