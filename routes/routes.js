const { mainPageMarkup, submitSuccessMarkup } = require('../views')

const todos = [];

const getMainPage = (req, res) => {
  res.writeHead(200, {
      'Content-Type': 'text/html'
    });
  res.end(mainPageMarkup, 'utf8');
};

const postForm = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    console.log(body);
    todos.push(body.split('=')[1]);
    console.log(todos);

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(submitSuccessMarkup, 'utf8');
  });
};

module.exports = {
  getMainPage,
  postForm
};