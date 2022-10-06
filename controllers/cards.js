const Card = require('../models/card');

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }));
};

module.exports.findCardById = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) { res.send(card); } else { res.status(404).send({ message: 'Запрашиваемая карточка не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Передан некорректный id' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(400).send({ message: 'Данные о новой карточке не удовлетворяют требованиям валидации' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (card._id === req.user._id) {
          Card.findByIdAndRemove(req.params.id);
        } else { res.status(403).send({ message: 'Это карточка другого пользователя' }); }
      } else { res.status(404).send({ message: 'Запрашиваемая карточка не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Передан некорректный id' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });

/* Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) { res.send(card); } else { res.status(404)
        .send({ message: 'Запрашиваемая карточка не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400)
        .send({ message: 'Передан некорректный id' }); } else { res.status(500)
          .send({ message: 'Ошибка! Проверьте введённые данные' }); }
    }); */
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) { res.send(card); } else { res.status(404).send({ message: 'Запрашиваемая карточка не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Передан некорректный id' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) { res.send(card); } else { res.status(404).send({ message: 'Запрашиваемая карточка не найден' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Передан некорректный id' }); } else { res.status(500).send({ message: 'Ошибка! Проверьте введённые данные' }); }
    });
};
