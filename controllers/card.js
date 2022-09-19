const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate('card')
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({  name, link, owner: userId })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};