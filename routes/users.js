const router = require('express').Router();
const { users } = require('../db.js');

router.get('/', (req, res) => {
  if (users.length === 0) {
    res.send(`База пользователей пуста`);
    return;
  }
  res.send(`Список пользователей:
  ${users}`);
});

router.get('/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }
  const { name, age } = users[req.params.id];
  res.send(`Пользователь ${name}, ${age} лет`);
});

module.exports = router;