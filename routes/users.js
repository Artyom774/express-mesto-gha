const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, findUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/:id', findUserById);
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
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
