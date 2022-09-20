const router = require('express').Router();
const { getCard, createCard } = require('../controllers/cards');

router.get('/cards', getCard);
router.post('/cards', createCard);
//router.delete('/cards/:cardId', createCard);  // ещё не прописан

module.exports = router;