const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const { validationCreateUser, validationLogin } = require('./middlewares/validation.js');
const NotFoundError = require('./errors/NotFoundError.js'); // 404
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use((req, res, next) => {
  const { origin } = req.headers;
  const corsLinks = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://praktikum.tk',
    'http://praktikum.tk',
  ]

  if(corsLinks.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if(method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Methods', requestHeaders);

    return res.end();
  }
  return next();
})

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use(() => {
  throw new NotFoundError('Такой страницы нет');
})

app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({
    message: status === 500 ? 'Ошибка сервера' : message
  });
  next();
})


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
