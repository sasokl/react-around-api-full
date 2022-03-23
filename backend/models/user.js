const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const avatarRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email`,
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => avatarRegex.test(v),
      message: (props) => `${props.value} is invalid link`,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
