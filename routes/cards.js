const cardsRouter = require('express').Router();
const { findAllCards, findCardById, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/', findAllCards);
cardsRouter.get('/:id', findCardById);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);

module.exports = cardsRouter;