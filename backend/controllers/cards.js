const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr('Invalid data in card\'s fields'));
      else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) res.send({ data: card });
      else throw new ForbiddenErr('You do not have permission to access this resource.');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestErr('Some of card fields are wrong.'));
      else next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('No card found with that id');
  })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of card fields are wrong.'));
    else next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('No card found with that id');
  })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of card fields are wrong.'));
    else next(err);
  });
