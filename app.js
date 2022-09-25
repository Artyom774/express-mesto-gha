const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/users.js');
const cors = require('cors')

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

const timeLog = (req, res, next) => {
  console.log(req.method);
  next();
};

app.use(timeLog);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', router);

app.use(express.static(path.join(__dirname, 'public')));  // Если обратиться к корню сервера, мы автоматически попадём в папку public и получим файл index.html

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});