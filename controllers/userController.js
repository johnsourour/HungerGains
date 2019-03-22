var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/login', function (req, res) {
  console.log("got post login"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)//HASH IT HERE 
  let userType = "'end_user'"
  let sql = "select * from user where username = " + username + " and hashedPwd = " + password + " and userType = " + userType ;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      if(result.length >0)
        res.send('Success')
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
           email + "," + Fname + "," + Lname + "," + password + "," + date+ ")";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       res.send('Success');  
    }
      });
  });

router.get('/profile', function (req, res) {
  console.log("got get user profile"); 
  
  let username = db.NullCheckChar(req.body.username)
  let userType = "'end_user'"
  let sql = "select * from user where username = " + username + " and userType = " + userType;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
       res.send(result);  
    }
      });
  });

module.exports = router;
