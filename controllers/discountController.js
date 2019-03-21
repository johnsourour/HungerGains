var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// add discount
router.post('/add', function (req, res) {
  console.log("got post request add discount"); 
  
  let code = req.body.discount_code
  let date = '\''+ req.body.expiry_year + '-'+ req.body.expiry_month + '-'+req.body.expiry_day +'\''
  let rate = req.body.rate
  let sql = "insert into discount values ( " + code+ "," + date + "," + rate +")"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.json(result);  
    }
      });
  });

//update discount rate
 router.post('/updateRate', function (req, res) {
  console.log("got post request update discount rate"); 
  
  let code = req.body.discount_code
  let rate = req.body.rate
  let sql = "update discount set rate = " + rate + "  where discountID = " + code;
  console.log(sql);
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.json(result);  
    }
      });
  });

  //update discount expiry
 router.post('/updateExpiry', function (req, res) {
  console.log("got post request update discount expiry"); 
  
  let code = req.body.discount_code
  let date = '\''+ req.body.expiry_year + '-'+ req.body.expiry_month + '-'+req.body.expiry_day +'\''
  let sql = "update discount set expiryDate = " + date + "  where discountID = " + code;
  db.mycon.query(sql, function (err, result) {
    
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.json(result);  
    }
      });
  });  


//remove discount by code
 router.post('/remove', function (req, res) {
  console.log("got post request add discount"); 
  
  let code = req.body.discount_code
  let sql = "delete from discount where discountID = " + code;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.json(result);  
    }
      });
  }); 

// get all discounts
router.get('/all', function (req, res) {
  console.log("got get request all discounts"); 
  let sql = "select * from discount";
  db.mycon.query(sql, function (err, result) {
   
    if(err){
      res.send(err);
    } else {
     
     res.json(result);  
    }
  });
});

module.exports = router;
