var express = require('express');

var app = express();
var db = require('./db');
var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
var path = __dirname + '/views/';

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
//the above function just allows for requests and responses to be 
//passed to and from backend and frontend 

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
 
//importing the controllers
var myController = require('./controllers/myController');
var discountController = require('./controllers/discountController');
var adminController = require('./controllers/adminController');
var userController = require('./controllers/userController');

//creating the route for the controller
app.use('/example', myController);
app.use('/discounts', discountController);
app.use('/admin', adminController);
app.use('/user', userController);


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});


// var customers = [];
// app.post("/api/customers/save", function(req,res){
//   console.log('Post a Customer: ' + JSON.stringify(req.body));
//   var customer = {};
//   customer.firstname = req.body.firstname;
//   customer.lastname = req.body.lastname;
  
//   customers.push(customer);
  
//   return res.send(customer);
// });
 
// app.get("/api/customers/all", function(req,res){
//   console.log("Get All Customers");
//   return res.send(customers);
// });


app.use("/",router);
 
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});
 
module.exports = app;