var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var nodemailer = require('nodemailer'); 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hungergains19@gmail.com',
    pass: 'HG_2019_JohnS'
  }
});

var generator = require('generate-password');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/login', function (req, res) {
  console.log("got post login"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)//HASH IT HERE 
  let sql = "select * from user where username = " + username + " and hashedPwd = " + password + " and userStatusName = 'alive'";
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      if(result.length >0)
        res.send('Success ' + result[0].userType) // REDIRECT TO PROPER PAGE
      else 
         res.send('Fail')  
    }
      });
  });

router.post('/signup', function (req, res) {
  console.log("got post signup"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password) //HASH IT HERE 
  let userType = "'end_user'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let addressLine1 = db.NullCheckChar(req.body.addressLine1)
  let addressLine2 = db.NullCheckChar(req.body.addressLine2)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+ "," + addressLine1+ "," + addressLine2+ "," +
           email + "," + Fname + "," + Lname + "," + password + "," + date+ ", 'alive' )";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       res.send('Success');  
    }
      });
  });
var cur_user = 'johnuser' 
router.post('/changePassword', function (req, res) {
  console.log("got change pwd"); 
  let password = db.NullCheckChar(req.body.password) //HASH IT HERE 
  var sql = "update User set hashedPwd = " +password + " where username = " + db.NullCheckChar(cur_user);
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       res.send('Success');  
    }
      });
  });


router.post('/forgotPassword', function (req, res) {
  console.log("got forgot pwd"); 
  var password = generator.generate({
    length: 10,
    numbers: true
  });
  var username = db.NullCheckChar(req.body.username)
  var sql = "update User set hashedPwd = " + db.NullCheckChar(password) + " where username = " +username;
  db.mycon.query(sql, function (err, result) {
    console.log(sql+"Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       var sql2 = "select email from User where username = " + username;
       db.mycon.query(sql2, function (err, result) {
          console.log(sql2+"Result: " + JSON.stringify(result));
          if(err){
            res.send(err.sqlMessage);
          }else {
            var email = result[0].email
            var mailOptions = {
              from: 'hungergains19@gmail.com',
              to: email,
              subject: 'Your password has been reset',
              text: 'Dear '+req.body.username +",\n Your password has been reset to: " + password +"\n You can now login and change it\n"+
              "\n Regards, \n HungerGains Team\n"
            };
            transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
               }); 
            
          }
            });
    }
      });
  });



router.get('/profile', function (req, res) {
  console.log("got get user profile"); 
  
  let username = db.NullCheckChar(req.body.username)
  let sql = "select * from user where username = " + username + " and userStatusName = 'alive'";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       if(result.length >0)
        res.send(result)
      else 
         res.send('Fail')  
    }
      });
  });


function CheckField(key, value){
  if(value== null || value==undefined)
    return key;
  return db.NullCheckChar(value);
};

function CheckQuery(key, value){
  if(value== null || value==undefined)
    return key;
  return value;
};

router.get('/restaurants', function (req, res) {
  console.log("got get all restaurants"); 
  var cuisine = CheckField("cuisine", req.body.cuisine);
  var areaName = CheckField("areaName", req.body.areaName);
  var search = "'%" + CheckQuery("", req.body.search) + "%'";
  console.log("SEARCH "+search);
  var sql = "select * from restaurant where restaurantID IN ( select restaurantID from restaurantdeliveryarea where areaName ="+ areaName+
    " and restaurantID IN  (select restaurantID from restaurant where restaurantName like " + search +")) and cuisine = "+ cuisine
  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });

  router.get('/myOrders', function (req, res) {
  var cur_user = 'johnuser' // GET THIS
  var sql = "Select * from cart where orderedByName = "+db.NullCheckChar(cur_user)
  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });


  var current_restaurant = 'McDonalds'; //GET THIS SOMEHOW
function CheckActive(value){
  if(value== null || value==undefined)
    return "starthour=starthour";
  return "startHour<=" + value + " and endhour>="+value;
};
function CheckZeros(value){
  val = value.toString();
  if(val.length==2)return value;
  else if(val.length==1)return "0"+value;
  else return "00";
};

router.get('/restaurantMenu', function (req, res) {
      var today = new Date();
      var time;
      if(req.body.active=="True"){
        time= CheckZeros(today.getHours())+""+ CheckZeros(today.getMinutes())+""+ CheckZeros(today.getSeconds());
      }
      console.log(time);
      var active = CheckActive(time);
      var menuType = CheckField("menuType", req.body.menuType);
      var sql = "select * from restaurantMenu where restaurantID IN ( select restaurantID from restaurant where restaurantName ="+
      db.NullCheckChar(current_restaurant) +") and "+active+" and menuType = "+menuType;
  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });
  
//importing user controllers
var addressController = require('./user/addressController');
var restaurantController = require('./user/restaurantController');

//creating the route for the controllers
router.use('/address', addressController);
router.use('/restaurant', restaurantController);


module.exports = router;
