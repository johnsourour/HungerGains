var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/all', function (req, res) {
  console.log("got get all restaurants"); 
  var sql = "select * from restaurant"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });
  

router.post('/add', function (req, res) {
  console.log("got post add restaurant");
  var name = db.NullCheckChar(req.body.restaurant_name); 
  var cuisine = db.NullCheckChar(req.body.cuisine); 
  var deliveryFee = db.NullCheckNum(req.body.deliveryFee); 
  var address = db.NullCheckChar(req.body.address); 
  var taxPercent = db.NullCheckNum(req.body.taxPercent); 
  if(taxPercent<0.0 || taxPercent>1.0){
    res.send("wrong params");
    return;
  }
  var sql = "insert into restaurant Values(null, "+name +","+cuisine +","+deliveryFee +","+address +","+taxPercent +");";
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });

router.post('/modify', function (req, res) {
  console.log("got post modify restaurant");

  var restaurantID = req.body.restaurantID;
  var name = db.NullCheckChar(req.body.restaurant_name); 
  var cuisine = db.NullCheckChar(req.body.cuisine); 
  var deliveryFee = db.NullCheckNum(req.body.deliveryFee); 
  var address = db.NullCheckChar(req.body.address); 
  var taxPercent = db.NullCheckNum(req.body.taxPercent); 
  if(taxPercent<0.0 || taxPercent>1.0){
    res.send("wrong params");
    return;
  }
  var sql = "update restaurant set restaurantName = "+name +", cuisine = "+cuisine +", deliveryFee = "+deliveryFee +", rest_add = "+address +", taxPercent = "+taxPercent +
        " where restaurantID = "+restaurantID;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send("success");
    }
      });
  });


router.post('/remove', function (req, res) {
  console.log("got post remove restaurant");
  var restaurantID = req.body.restaurantID;
  var sql = "delete from restaurant where restaurantID = " + restaurantID;
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });
  


router.post('/addArea', function (req, res) {
  console.log("got post add area");
  var areaName = db.NullCheckChar(req.body.areaName);
  var restaurantID;
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into restaurantDeliveryArea values(" + areaName+","+restaurantID+");";
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send("Success");
            }
              });
      }
        });
});

router.get('/areas', function (req, res) {
  console.log("got get areas");
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        var sql2 = "select areaName from restaurantDeliveryArea where restaurantID ="+restaurantID;
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send(result);
            }
              });
      }
        });
});
  
 router.post('/removeArea', function (req, res) {
  console.log("got post remove area");
  var areaName = db.NullCheckChar(req.body.areaName);
  var restaurantID;
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "delete from restaurantDeliveryArea where restaurantID="+restaurantID+" and areaName="+areaName;
         db.mycon.query(sql2, function (err, result) {
            console.log("Result: " + JSON.stringify(result));
            if(err){
              res.send(err);
            }else {
              res.send("Success");
            }
              });
      }
        });
});
  
//importing admin controllers
var menuController = require('./menuController');

//creating the route for the controllers
router.use('/menu', menuController);

module.exports = router;
