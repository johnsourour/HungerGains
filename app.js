var express = require('express');
var app = express();
var db = require('./db');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
//the above function just allows for requests and responses to be 
//passed to and from backend and frontend 

//importing the controller
var myController = require('./controllers/myController');

//creating the route for the controller
app.use('/myroute', myController);


module.exports = app;
