const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// validate: validator.$isEmail(),

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) { res.send(user); } else { res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Передан некорректный id' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.createUser = (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({ message: 'Email не удовлетворяет требованиям валидации' });
    return;
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(400).send({ message: 'Данные о новом пользователе не удовлетворяют требованиям валидации' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') { res.status(400).send({ message: err.message }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.updateUser = (req, res) => {
  const meId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(meId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) { res.send(user); } else { res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(400).send({ message: 'Новые данные не удовлетворяют требованиям валидации' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.updateAvatar = (req, res) => {
  const meId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(meId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) { res.send(user); } else { res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(400).send({ message: 'Новые данные не удовлетворяют требованиям валидации' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};
