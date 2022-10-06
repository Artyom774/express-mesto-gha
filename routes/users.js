const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, getMeById, findUserById, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/me', getMeById);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
