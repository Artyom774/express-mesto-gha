const { postForm, getMainPage } = require('./routes');

const router = (req, res) => {
    if (req.url === '/submit' && req.method === 'POST') {
        postForm(req, res);
    }

    if (req.url === '/' && req.method === 'GET') {
        getMainPage(req, res);
    }
};

module.exports = {
    router
};