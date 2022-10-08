const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signInRouter = require('./routes/signIn');
const signUpRouter = require('./routes/signUp');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env; // файла .env нет в проекте
const app = express(); // app работает через фреймворк Express
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', { // подключение к базе MongooseDB
  useNewUrlParser: true,
});

const timeLog = (req, res, next) => { // вывод метода запроса
  console.log('Используемый метод запроса: ', req.method);
  next();
};

app.use(timeLog); // при любом запросе выводит его метод (нужно для разработки)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signInRouter); // авторизация пользователя
app.post('/signup', signUpRouter); // регистрация пользователя
app.use(auth); // проверка токена
app.use('/users', usersRouter); // пути для работы с карточками
app.use('/cards', cardsRouter); // пути для работы с пользователем
app.use('/', (req, res) => { res.status(404).send({ message: 'Неправильный url-адрес запроса' }); }); // введён неизвестный путь
app.use(errors()); // обработка ошибок библиотеки celebrate
app.use(errorHandler); // обработка ошибок сервера

app.listen(PORT, () => { // при запуске сервера выводит порт
  console.log(`Порт сервера: ${PORT}`);
});
