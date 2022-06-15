const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');
console.log('prequile');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  console.log('111');
  const { authorization } = req.headers;
  console.log('222');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log('before try');
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedErr('Authorization Required'));
  }
  console.log('after try');
  req.user = payload;
  console.log('before next');
  next();
};
