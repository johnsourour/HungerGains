var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
 

// GET MENU ITEMS (ACTIVE)
router.get('/items', function (req, res) {
  console.log("get Menu Item"); 
  var today = new Date();
  var time = CheckActive(CheckZeros(today.getHours())+""+ CheckZeros(today.getMinutes())+""+ CheckZeros(today.getSeconds()))

  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select I.* from restaurantmenu M, restaurantMenuItem I where M.restaurantID = I.restaurantID "+
        "and M.menuType=I.menutype and "+time;
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


  

// GET MENU ITEMS CONFIGS  
  router.get('/itemConfigs', function (req, res) {
  console.log("get Menu Item Config"); 
  var restaurantName = db.NullCheckChar(req.body.restaurantName)
  var menuType= db.NullCheckChar(req.body.menuType)
  var itemName = db.NullCheckChar(req.body.itemName)
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "select * from restaurantMenuItemConfig where restaurantID ="+restaurantID+" and menuType= "+menuType+" and menuItemName = "+itemName+";";
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



var cur_user = 'johnuser' //GET THIS
var cur_restaurant = 1
var cur_cart = 3
var cur_menutype = 'Lunch'

router.post('/menu/createCart', function (req, res) {
  console.log("got post create cart"); 
  var address_num = req.body.address_num;
  var restaurantName = db.NullCheckChar(req.body.restaurantName);
  var discountID = req.body.discountID
  if(discountID==undefined) 
      discountID = null
  var sql = "select restaurantID from restaurant where restaurantName="+restaurantName+";";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        restaurantID=result[0].restaurantID
        console.log("got id: "+restaurantID);
        var sql2 = "insert into Cart values(null, "+db.NullCheckChar(cur_user)+", "+ address_num+","+restaurantID+","+discountID+", 'Pending');";
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

router.post('/menu/addToCart', function (req, res) {
  console.log("got post add to cart"); 
  
  var menuType = db.NullCheckChar(cur_menutype); //FRONT END 
  var restaurantID = cur_restaurant 
  var cartID = cur_cart // FRONT END

  var configName = db.NullCheckChar(req.body.configName);
  var itemName = db.NullCheckChar(req.body.itemName);
  var quantity = db.NullCheckNum(req.body.quantity)
  var comment = db.NullCheckChar(req.body.comment)
  
  var sql = "insert into CartItem values ("+cartID+","+menuType+","+restaurantID+","+itemName+","+configName+","+quantity+","+comment+")";
  db.mycon.query(sql, function (err, result) {
      console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send("Success")
      }
        });
});

router.post('/menu/removeFromCart', function (req, res) {
  console.log("got post remove from cart"); 
  
  var menuType = db.NullCheckChar(cur_menutype); //FRONT END 
  var restaurantID = cur_restaurant 
  var cartID = cur_cart 

  var configName = db.NullCheckChar(req.body.configName);
  var itemName = db.NullCheckChar(req.body.itemName);
  
  var sql = "delete from CartItem where cartID ="+cartID+" and menuType = "+menuType+
  " and restaurantID = "+restaurantID+" and menuItemName = "+itemName+" and configName = "+configName+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send("Success")
      }
        });
});


router.get('/menu/getCart', function (req, res) {
  console.log("got cart"); 
  

  var cartID = cur_cart
  
  var sql = "select * from CartItem where cartID ="+cartID+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send(result)
      }
        });
});
router.get('/menu/getCartTotal', function (req, res) {
  console.log("got cart"); 
  

  var cartID = cur_cart
  
  var sql = "select * from CartTotal where cartID ="+cartID+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send(result)
      }
        });
});

router.post('/menu/placeOrder', function (req, res) {
  console.log("got cart"); 
  

  var cartID = cur_cart
  
  var sql = "update Cart set statusName='Received' where cartID ="+cartID+";"
    db.mycon.query(sql, function (err, result) {
        console.log("Result: " + JSON.stringify(result));
      if(err){
        res.send(err);

      }else {
        res.send("success")
      }
        });
});
module.exports = router;
