const router = require('express').Router();
const { getCard, createCard } = require('../controllers/cards');

router.get('/cards', getCard);
router.post('/cards', createCard);
//router.delete('/cards/:cardId', createCard);  // в разработке

module.exports = router;