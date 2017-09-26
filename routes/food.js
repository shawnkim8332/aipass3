var unirest = require('unirest');
var express = require('express');
var router = express.Router();
var apikey = "uceoxKzgAQmshwQy7iGKdZff8PcKp1XisucjsnS9qKSG9qMzeO";
router.get("/menuitem",function(req,res){
    var input = req.query;
    var queryString = input.queryString;
    var apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/search";
    apiUrl += queryString;
    unirest.get(apiUrl)
        .header("X-Mashape-Key", apikey)
        .header("Accept", "application/json")
        .end(function (result) {
            return res.json(result.body);
        });
});

module.exports = router;