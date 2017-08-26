var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next){
    res.render('product_list.html');
});

router.all('/product_detail/:id', function(req, res, next){
      console.log("param id==>"+req.params.id);
//    res.render('product_detail.html');
});


module.exports = router;