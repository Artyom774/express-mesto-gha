const Card = require('../models/card');

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findCardById = (req, res) => {
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      if (card) {res.send(card)}
      else {res.status(404).send({ message: "Запрашиваемая карточка не найден"})}
    })
    .catch(() => res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }));
};

module.exports.createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {res.status(400).send({ message: 'Данные о новой карточке не удовлетворяют требованиям валидации' })}
      else {res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' })}});
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true },)  // добавить _id в массив, если его там нет
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true },)  // убрать _id из массива
  .then(card => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};