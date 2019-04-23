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
    
  });
  return next();
}
function getUserInfo(token, callback){

  if (!token)
      return callback({});

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err)
       return callback({});
    }
    console.log("decoded ", JSON.stringify(decoded.user))
    return callback(decoded);
    
  });
}

module.exports = {
  verifyToken : verifyToken,
  getUserInfo : getUserInfo
};