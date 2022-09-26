const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // у карточки есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждой карточки
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);