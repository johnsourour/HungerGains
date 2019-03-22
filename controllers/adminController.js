var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var app = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var current_admin = 'johnadmin' //GET THIS SOMEWAY

router.post('/CreateAdmin', function (req, res) {
  console.log("got post request add admin"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'admin'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let addressLine1 = db.NullCheckChar(req.body.addressLine1)
  let addressLine2 = db.NullCheckChar(req.body.addressLine2)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+ "," + addressLine1+ "," + addressLine2+ "," +
           email + "," + Fname + "," + Lname + "," + password + "," + date+ " , 'alive')";

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'create_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });

router.post('/ChangeAdminPassword', function (req, res) {
  console.log("got post request change admin password"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'admin'"
  let sql = "update user set hashedPwd = " + password + " where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'modifyPassword_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });

router.post('/RemoveAdmin', function (req, res) {
  console.log("got post request remove admin"); 
  
  let username = db.NullCheckChar(req.body.username)
  let userType = "'admin'"
  let sql = "update user set userStatusName = 'dead' where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'remove_admin', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });



router.post('/CreateStaff', function (req, res) {
  console.log("got post request add staff"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'staff'"
  let phoneNo = db.NullCheckChar(req.body.phoneNo)
  let addressLine1 = db.NullCheckChar(req.body.addressLine1)
  let addressLine2 = db.NullCheckChar(req.body.addressLine2)
  let email = db.NullCheckChar(req.body.email)
  let Fname = db.NullCheckChar(req.body.Fname)
  let Lname = db.NullCheckChar(req.body.Lname)  
  let date = db.NullCheckDate(req.body.day, req.body.month, req.body.year ) 
  let sql = "insert into user values( " + username + "," + userType+ "," +  phoneNo+ "," + addressLine1+ "," + addressLine2+ "," +
           email + "," + Fname + "," + Lname + "," + password + "," + date+ ", 'alive')";

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'create_staff', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });

router.post('/ChangeStaffPassword', function (req, res) {
  console.log("got post request change staff password"); 
  
  let username = db.NullCheckChar(req.body.username)
  let password = db.NullCheckChar(req.body.password)  //HASH IT HERE 
  let userType = "'staff'"
  let sql = "update user set hashedPwd = " + password + " where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'modifyPassword_staff', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });


router.post('/RemoveStaff', function (req, res) {
  console.log("got post request remove staff"); 
  
  let username = db.NullCheckChar(req.body.username)
  let userType = "'staff'"
  let sql = "update user set userStatusName = 'dead'  where username = " + username + " and userType = " + userType;

  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err.sqlMessage);
    }else {
      let sql2 = "insert into log values( current_timestamp(), 'remove_staff', " + db.NullCheckChar(current_admin) + " , " + username + ")";
      db.mycon.query(sql2, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err)
        res.send(err.sqlMessage);
        });
  
       res.send('Success');  
    }
      });
  });

router.get('/all_logs', function (req, res) {
  console.log("got get request all logs"); 
  let sql = "select * from log";
  db.mycon.query(sql, function (err, result) {
   
    if(err){
      res.send(err);
    } else {
     
     res.json(result);  
    }
  });
});

//importing admin controllers
var restaurantController = require('./restaurantController');
var discountController = require('./discountController');

//creating the route for the controllers
router.use('/restaurants', restaurantController);
router.use('/discounts', discountController);

module.exports = router;
