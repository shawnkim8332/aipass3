var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');

//Retrieving product list from database
router.get("/product/list",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;
        var sql = "SELECT product_id,";
        sql += " product_nm,";
		sql += " image_path,";
		sql += " price,";
		sql += " ingredient,";
        sql += " description";
        sql += " FROM product as p";

        con.query(sql, function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving product list data');
                con.release();
                return res.send(err);
            }
			console.log("Pdoduct front data sent");
            return res.json(rows);
        });
    });
});

module.exports = router;