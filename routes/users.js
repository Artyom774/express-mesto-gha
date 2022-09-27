const usersRouter = require('express').Router();
const { findAllUsers, findUserById, createUser} = require('../controllers/users');

usersRouter.get('/', findAllUsers);
usersRouter.get('/:id', findUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;