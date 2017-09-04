var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next){
    res.render('index.html');
});


router.all('/admin', function(req, res, next){
    res.render('admin/product_list.html');
});

router.all('/admin/product_detail/:id', function(req, res, next){
      console.log("param id==>"+req.params.id);
//    res.render('product_detail.html');
});

module.exports = router;