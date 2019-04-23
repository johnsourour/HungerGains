var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
  var token = req.body.token;
  console.log("in verify token " +token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // if everything good, save to request for use in other routes
    req.userId = decoded.id.user;
    console.log("all good in verify token " +token)
    
  });
  return next();
}

module.exports = verifyToken;