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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
});
cardSchema.set('versionKey', false);

module.exports = mongoose.model('card', cardSchema);