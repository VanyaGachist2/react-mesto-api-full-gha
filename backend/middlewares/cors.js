const allowedCors = [
  'https://vanyagachist.nomoredomainsmonster.ru/',
  'http://vanyagachist.nomoredomainsmonster.ru/',
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
  'https://api.vanyagachist.nomoredomainsmonster.ru/',
  'http://api.vanyagachist.nomoredomainsmonster.ru/',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const defaultMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if(allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);

  if(method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', defaultMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
}
