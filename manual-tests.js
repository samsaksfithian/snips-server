const Snippet = require('./models/Snippet.model');

async function testSnippetInsert() {
  try {
    const newSnippet = await Snippet.insert({
      author: 'Kevin',
      code: 'something that needs refactoring',
      title: 'badname.js',
      description: 'good code, I think!',
      language: 'javascript',
    });
    console.log(newSnippet);
  } catch (err) {
    console.error(err);
  }
}

async function testSnippetSelect() {
  try {
    const snippets = await Snippet.select();
    console.log(snippets);
  } catch (err) {
    console.error(err);
  }
}

async function testSnippetDelete() {
  try {
    const deleted = await Snippet.delete('udOyEENZJ');
    console.log(deleted);
  } catch (err) {
    console.error(err);
  }
}

async function testSnippetUpdate() {
  try {
    const updatedSnippet = await Snippet.update('1', { author: 'Scooter' });
    console.log(updatedSnippet);
  } catch (err) {
    console.error(err);
  }
}

// testSnippetInsert();
// testSnippetSelect();
testSnippetUpdate();
// testSnippetDelete();
