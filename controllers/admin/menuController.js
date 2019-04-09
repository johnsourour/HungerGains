var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var cur_restaurant = 'McDonalds' //GET THIS

router.get('/viewMenu', function (req, res) {
  console.log("got get restaurantMenu"); 
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
  


module.exports = router;
