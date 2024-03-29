const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError.js'); // 401
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('необходима регистрация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('необходима авторизация'));
  }

  req.user = payload;
  next();
};
