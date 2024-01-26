const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const UserError = require('../errors/UserError'); // 403

module.exports.getCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    return res.status(200).json(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.createCard = async (req, res, next) => { // +
  const { name, link } = req.body;
  try {
    const card = new Card({ name, link, owner: req.user._id });
    const savedCard = await card.save();
    return res.status(201).json(savedCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некоррентные данные'));
    }
    return next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => { // +
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточки нет');
    }
    if (card.owner.toString() !== req.user._id) {
       throw new UserError('это не ваша карточка, удаление невозможно');
    }
    await Card.findByIdAndDelete(req.params.cardId);
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('проблемма с _id'));
    }
    return next(err);
  }
};

module.exports.likedCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
      );
      if (!card) {
        throw new NotFoundError('Карточки нет');
      }
      return res.status(200).json(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некоррентные данные'));
    }
    return next(err);
  }
};

module.exports.deleteLike = async (req, res, next) => { // +
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
      );
      if (!card) {
        throw new NotFoundError('Карточки нет');
      };
      return res.status(200).json(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некоррентные данные'));
    }
    return next(err);
  }
};
