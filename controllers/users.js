const User = require('../models/user');

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {res.send(user)}
      else {res.status(404).send({ message: "Запрашиваемый пользователь не найден"})}
    })
    .catch((err) => {
      if (err.name === 'CastError') {res.status(400).send({ message: 'Передан некорректный id' })}
      else {res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' })}});
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {res.send(user)})
    .catch((err) => {
      if (err.name === 'ValidationError') {res.status(400).send({ message: 'Данные о новом пользователе не удовлетворяют требованиям валидации' })}
      else {res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' })}});
};

module.exports.updateUser = (req, res) => {
  const meId = req.user._id;
  const { name, about } = req.body;
  /*if (name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
    res.status(400).send({ message: 'Новые данные не удовлетворяют требованиям валидации' });
    return
  }*/

  User.findByIdAndUpdate(meId, { name: name, about: about }, {new: true,
    runValidators: true // данные будут валидированы перед изменением
})
    .then((user) => {
      if (user) {res.send(user)}
      else {res.status(404).send({ message: "Запрашиваемый пользователь не найден"})}
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {res.status(400).send({ message: 'Новые данные не удовлетворяют требованиям валидации' })}
      else {res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' })}});
};

module.exports.updateAvatar = (req, res) => {
  const meId = req.user._id;
  const { avatar } = req.body;
  if (avatar.length === 0) {
    res.status(400).send({ message: 'Введено некорректное значение' });
    return
  }

  User.findByIdAndUpdate(meId, { avatar: avatar })
    .then((user) => {
      if (user) {res.send(user)}
        else {res.status(404).send({ message: "Запрашиваемый пользователь не найден"})}
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' })});
};