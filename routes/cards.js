const cardsRouter = require('express').Router();
const Card = require('../models/card');

cardsRouter.get('/', (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

cardsRouter.get('/:id', (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      const { name, link } = card;
      res.send(`Карточка ${name}, ссылка: ${link}`)})
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

cardsRouter.post('/', (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then(user => res.send( user ))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = cardsRouter;