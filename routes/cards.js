const cardsRouter = require('express').Router();
const { findAllCards, findCardById, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', findAllCards);
cardsRouter.get('/:id', findCardById);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;