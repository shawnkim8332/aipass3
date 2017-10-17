var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

//Home Page Route
router.all('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;