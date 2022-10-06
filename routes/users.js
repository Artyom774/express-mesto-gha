const usersRouter = require('express').Router();
const {
  findAllUsers, findUserById, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/:id', findUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
