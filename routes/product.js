var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');

//Retrieving product list from database
router.get("/list",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;
        var sql = "SELECT product_id,";
        sql += " product_nm,";
        sql += " description";
        sql += " FROM product as p";

        con.query(sql, function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving product list data');
                con.release();
                return res.send(err);
            }
            return res.json(rows);
        });
    });
});

//Retrieving single product data
router.get("/product/:id",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;

        var sql = "SELECT p.product_id, ";
        sql += "p.product_nm, ";
        sql += "p.description ";
        sql += "FROM product as p ";
        sql += "where p.product_id = ?";

        //binding product id in the where clause
        var values = [req.params.id];

        con.query(sql, [values], function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving single product');
                return res.send(err);
            }
            console.log('product data retrieved');
            con.release();
            return res.json(rows);
        });
    });
});

//Updating product data
router.post('/product/update/:id', function(req, res, next){
    // getting input data
    var product = req.body;

    getConnection(function (err, con) {
        if (err) throw err;

        var sql = "UPDATE product set product_nm = ?, description = ?  where product_id = ?";

        //binding input data into update sql
        var values = [product.product_nm, product.description, product.product_id];

        con.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " Product record updated");
            return res.json();
        });
    });
});

//Retrieving flavor data
router.get("/flavor/:id",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;

        var sql = "SELECT f.flavor_id, f.flavor_nm FROM flavor as f where f.product_id = ?";

        //binding flavor id in the where clause
        var values = [req.params.id];

        con.query(sql, [values], function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving flavor data');
                return res.send(err);
            }
            return res.json(rows);
        });
    });
});

//Retrieving ingredient data
router.get("/ingredient/:id",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;

        var sql = "SELECT i.ingred_id, ";
        sql += "i.ingred_nm, ";
        sql += "q.quantity, ";
        sql += "q.unit ";
        sql += "from ingredient as i, ";
        sql += "ingred_qty as q ";
        sql += "where i.ingred_id = q.ingred_id ";
        sql += "and   q.flavor_id = ? ";

        //binding flavor id in the where clause
        var values = [req.params.id];

        con.query(sql, [values], function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving ingredient Query.');
                return res.send(err);
            }
            return res.json(rows);
        });
    });
});


router.get("/product/list",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;
        var sql = "SELECT product_id,";
        sql += " product_nm,";
        sql += " description";
        sql += " FROM product as p";

        con.query(sql, function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving product list data1');
                con.release();
                return res.send(err);
            }
            return res.json(rows);
        });
    });
});

module.exports = router;