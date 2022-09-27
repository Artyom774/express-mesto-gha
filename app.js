const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards');
const cors = require('cors');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  //useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false
});

const timeLog = (req, res, next) => {
  console.log(req.method);
  next();
};

app.use(timeLog);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT}`);
});