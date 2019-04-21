var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/viewOrders', function (req, res) {
  console.log("got staff view order");
  var sql = "select * from Cart where statusName not in ('Pending') order by CartID" 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
      });
  });

  router.post('/cancelOrder', function (req, res) {
  console.log("got staff cancel order");
  var cartID = db.NullCheckNum(req.body.cartID)
  var sql = "update Cart set statusName = 'Cancelled' where CartID= "+cartID; 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.send("success");
    }
      });
  });
router.post('/changeOrderStatus', function (req, res) {
  console.log("got staff change order ");
  var cartID = db.NullCheckNum(req.body.cartID)
  var statusName = db.NullCheckChar(req.body.statusName)
  var sql = "update Cart set statusName = "+statusName+" where CartID= "+cartID; 
  db.mycon.query(sql, function (err, result) {
    var json = JSON.stringify(result)
    console.log("Result: " + json);
    if(err){
      res.send(err);
    }else {
      res.send("success");
    }
      });
  });



module.exports = router;
