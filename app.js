const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env; // файла .env нет в проекте
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const timeLog = (req, res, next) => {
  console.log('Используемый метод запроса: ', req.method);
  next();
};

app.use(timeLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/cards', auth);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => { res.status(404).send({ message: 'Неправильный url-адрес запроса' }); });

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});
