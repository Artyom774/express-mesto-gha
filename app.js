const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const timeLog = (req, res, next) => {
  console.log(req.method);
  next();
};

app.use(timeLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '632c76b5bc6118315f71b074',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => { res.status(404).send({ message: 'Неправильный url-адрес запроса' }); });

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});
