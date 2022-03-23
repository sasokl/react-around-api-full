const mongoose = require('mongoose');

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => linkRegex.test(v),
      message: (props) => `${props.value} is invalid link`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
