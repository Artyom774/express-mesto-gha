const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

router.get('/users', getUsers);
//router.get('/users/:userId', getUsers); // еще не прописан
router.post('/users', createUser);

module.exports = router;