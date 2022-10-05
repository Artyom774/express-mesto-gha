const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, findUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/:id', findUserById);
usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
