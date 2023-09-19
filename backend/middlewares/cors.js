const allowedCorsUrl = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://mesto-project.nomoredomainsrocks.ru',
  'https://mesto-project.nomoredomainsrocks.ru',
  'https://api-mesto-project.nomoredomainsrocks.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCorsUrl.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  return next();
};

module.exports = cors;
