const cardsRouter = require('express').Router();
const { findAllCards, findCardById, createCard} = require('../controllers/cards');

cardsRouter.get('/', findAllCards);
cardsRouter.get('/:id', findCardById);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;