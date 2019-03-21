var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "234",
    database: "hungerdb"
    });

con.connect(function(err) {
    if (err) throw err;
    console.log("db Connected");
    });

module.exports.mycon = con;

//this is just a config file to connect to your mysql database
