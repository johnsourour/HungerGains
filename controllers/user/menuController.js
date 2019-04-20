var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET MENUS

// GET MENU ITEMS

// GET MENU ITEMS CONFIGS
module.exports = router;
