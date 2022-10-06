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

usersRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(5),
    password: Joi.string().required().min(8),
  }),
}), login);
usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    email: Joi.string().required().min(5),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(8),
    avatar: Joi.string(),
  }),
}), createUser);
app.use('/users', usersRouter);
app.use('/cards', auth);
app.use('/cards', cardsRouter);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(400).send({ message: err.message });
  next();
});
app.use('/', (req, res) => { res.status(404).send({ message: 'Неправильный url-адрес запроса' }); });

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});
