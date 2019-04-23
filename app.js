var express = require('express');

var app = express();
var db = require('./db');
var verifyToken = require('./verifyToken')
var router = express.Router();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

 
app.use(express.static('public'));
 
var path = __dirname + '/views/';

//app.engine('html', engines.mustache);
//app.set('view engine', 'html');

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
  res.sendFile(path+"login.html");
});


 
//importing the controllers
var adminController = require('./controllers/adminController');
var userController = require('./controllers/userController');
var staffController = require('./controllers/staffController');
var authController = require('./controllers/authController');

//creating the route for the controllers
app.use('/admin', adminController);
app.use('/user', userController);
app.use('/staff', staffController);
app.use('/auth', authController);


router.use(function (req,res,next) {
  console.log("/" + req.method + " "+ req.url);
  next();
});
app.use("/",router);

app.get("/home" , function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    console.log("in home get "+decoded.user+" "+decoded.type)
    if(decoded.type==undefined)
      res.sendFile(path+"404.html")
    else 
     res.sendFile(path+"home.html")
 })

});
app.get("/testcookie" , function(req,res){  
 var user = verifyToken.getUserInfo(req.cookies["cookieToken"], function(decoded){
    console.log("in home get "+decoded.user+" "+decoded.type)
    if(decoded.type==undefined)
      res.redirect("/")
    else 
     res.redirect("/home")
 })

});
app.get("/logout" , function(req,res){  
 res.clearCookie("cookieToken");
 res.redirect("/")

});

app.post("/home" ,verifyToken.verifyToken, function(req,res){
  console.log("in home "+JSON.stringify(req.body.token))
  res.cookie("cookieToken", req.body.token); 
 res.send({});
});

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});
 
module.exports = app;