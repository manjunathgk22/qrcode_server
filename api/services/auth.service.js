const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret );  // unlimited expiry { expiresIn: '365d' }
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
