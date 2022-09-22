module.exports.cards = [
  {name: 'Урал',
  link: 'ссылка на Урал'},
  {name: 'Сибирь',
  link: 'ссылка в Сибирь'},
];





/*const mongoose = require('mongoose');

const card = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link : {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: Array
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model('card', card);*/