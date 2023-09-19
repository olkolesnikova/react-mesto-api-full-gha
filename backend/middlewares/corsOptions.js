const CORS = [
  'http://mesto-project.nomoredomainsrocks.ru',
  'https://mesto-project.nomoredomainsrocks.ru',
  'http://api.mesto-project.nomoredomainsrocks.ru',
  'https://api.mesto-project.nomoredomainsrocks.ru',
  'http://84.201.164.40',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
