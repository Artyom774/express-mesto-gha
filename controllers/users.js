const User = require('../models/user');

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const { name, about } = user;
      res.send(`Пользователь ${name}, ${about}`)})
    .catch(() => res.status(500).send({ message: 'Запрашиваемый пользователь не найден' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send( user ))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};