const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');

const URLregex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(5),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    email: Joi.string().required().min(5).email(),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(8),
    avatar: Joi.string().pattern(URLregex),
  }),
}), createUser);
app.use(auth); // проверка токена
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => { res.status(404).send({ message: 'Неправильный url-адрес запроса' }); });
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});
