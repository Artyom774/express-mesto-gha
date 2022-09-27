const usersRouter = require('express').Router();
const { findAllUsers, findUserById, createUser, updateUser, updateAvatar } = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/:id', findUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;