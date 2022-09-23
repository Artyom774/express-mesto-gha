const http = require('http');

const { router } = require('./routes');

const { PORT = 3000 } = process.env;

const server = http.createServer(router);

server.listen(PORT);









/*const express = require('express');
const path = require('path');
//const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '632c76b5bc6118315f71b074' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});*/