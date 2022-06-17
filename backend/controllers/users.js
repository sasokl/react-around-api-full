const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const UnauthorizedErr = require('../errors/unauthorized-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

module.exports.getUserById = (req, res, next) => User.findById(req.params.id)
  .orFail(() => {
    throw new NotFoundError('No user found with that id');
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of card fields are wrong.'));
    else next(err);
  });

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of user fields are wrong.'));
    else next(err);
  });

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        email,
        password: hash,
        name,
        about,
        avatar,
      },
    ))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr('Invalid data in user\'s fields'));
      else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      // we return the token
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedErr('Authorization Required'));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr('Invalid data in user\'s profile fields'));
      else next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr('Invalid avatar link'));
      else next(err);
    });
};
