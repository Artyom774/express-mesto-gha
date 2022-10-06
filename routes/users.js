const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, getMeById, findUserById, updateUser, updateAvatar,
} = require('../controllers/users');

const URLregex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

usersRouter.get('/', findAllUsers);
usersRouter.get('/me', getMeById);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUserById);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    about: Joi.string().min(2).max(8),
  }),
}), updateUser);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URLregex),
  }),
}), updateAvatar);

module.exports = usersRouter;
