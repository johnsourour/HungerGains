var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var verifyToken = require('../verifyToken');
var nodemailer = require('nodemailer');
var app = require('../app.js');
var bcrypt = require('bcryptjs');

var pp = require('path');
var path= pp.resolve('./views');
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
  
  let username = db.NullCheckChar(req.body.username)
  //let password = db.NullCheckChar(bcrypt.hashSync(req.body.password, 8))
  
  let password = db.NullCheckChar(req.body.password)
  console.log("got post login " + req.body.username +" " +req.body.password); 
  let sql = "select * from user where username = " + username + " and hashedPwd = " + password + " and userStatusName = 'alive'";
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      console.log(err);
      return res.send(err);
    }else {
      console.log("here");
      
      return res.send(result)
    }
      });
  });

router.post('/signup', function (req, res) {
  console.log("got post signup"); 
  
  let username = db.NullCheckChar(req.body.username)
  //let password = db.NullCheckChar(bcrypt.hashSync(req.body.password, 8)) 
  let password = db.NullCheckChar(req.body.password) 
  let userType = "'end_user'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+ "," +
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

router.post('/changeInfo', function (req, res) {
  console.log("got change info"); 
  
  let username = db.NullCheckChar(req.body.username)
  //let password = db.NullCheckChar(bcrypt.hashSync(req.body.password, 8)) 
  let password = db.NullCheckChar(req.body.password) 
  let userType = "'end_user'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "update user set usertype=" + userType+ " , phoneNo=" +  phoneNo+ " , email=" +
           email + " , Fname=" + Fname + " , Lname=" + Lname + " , hashedPwd=" + password + " , Bdate=" + date +
           " where username =" + username;
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
 // let password = db.NullCheckChar(bcrypt.hashSync(req.body.password, 8)) 
  let password = db.NullCheckChar(req.body.password)  
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
  //var sql = "update User set hashedPwd = " + db.NullCheckChar(bcrypt.hashSync(password, 8)) + " where username = " +username;
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
            res.send({})
          }
            });
    }
      });
  });

  //FIGURE THIS
function getDate (Bdate){
  var day = 1
  var month = 2
  var year = 3
  return [day, month, year]
}
router.get('/profile/:user', function (req, res) {
  console.log("got get user profile"); 
  
  let username = db.NullCheckChar(req.params["user"])
  let sql = "select * from user where username = " + username + " and userStatusName = 'alive'";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else { 
       if(result.length >0)
       {
        var day, year, month;
        [day, month, year] = getDate(result[0].Bdate) 
        res.render(path+"/profile.html",{user:req.params["user"], phoneNo:result[0].phoneNo, 
        Fname:result[0].Fname, Lname:result[0].Lname, email:result[0].email, pwd:result[0].hashedPwd,
          day:day, year:year, month:month})
       }
      else 
         res.redirect('/404')  
    }
      });
  });


function CheckField(key, value){
  if(value== null || value==undefined || value=="")
    return key;
  return db.NullCheckChar(value);
};

function CheckQuery(key, value){
  if(value== null || value==undefined)
    return key;
  return value;
};

router.post('/restaurants', function (req, res) {
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

router.get('/restaurantMenu/:name', function (req, res) {
      var today = new Date();
      var time;
      if(req.body.active=="True"){
        time= CheckZeros(today.getHours())+""+ CheckZeros(today.getMinutes())+""+ CheckZeros(today.getSeconds());
      }
      console.log(time);
      var active = CheckActive(time);
      var menuType = CheckField("menuType", req.body.menuType);
      var sql = "select * from restaurantMenu where restaurantID IN ( select restaurantID from restaurant where restaurantName ="+
      db.NullCheckChar(req.params["name"]) +") and "+active+" and menuType = "+menuType;
  db.mycon.query(sql, function (err, result) {
    console.log(sql, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });

router.get('/areas', function (req, res) {
    var sql = "Select * from DeliveryArea;"
    db.mycon.query(sql, function (err, result) {
      console.log(sql, "Result: " + JSON.stringify(result));
      if(err){
        res.send(err);
      }else {
        res.send(result);
      }
        });
    });
router.get('/cuisines', function (req, res) {
  var sql = "select * from Cuisine;"
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
