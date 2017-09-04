var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');

//User Login Function
router.post("/register",function(req,res){
	console.log("register Called");
    console.log(req.body);
});

module.exports = router;
