var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Sample Post request
router.post('/mypostapi', function (req, res) {
  console.log("got post request"); 
  var date = new Date();
  var sql = "your raw sql query here"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      //your code here 
    }
      });
  });
  

router.get('/mygetapi', function (req, res) {
  console.log("got get request"); 
  let sql = "your raw sql query here"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    } else {
    //your code here 
    //you can use res.json(result); to send all data as a response 
    }
  });
});

module.exports = router;
