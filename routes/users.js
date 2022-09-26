const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

usersRouter.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const { name, about } = user;
      res.send(`Пользователь ${name}, ${about}`)})
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

usersRouter.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send( user ))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = usersRouter;