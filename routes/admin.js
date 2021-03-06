var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');
var jwt = require('jsonwebtoken');


//[Admin] Retrieving product list from database
router.post("/product/list",function(req,res){
    var data = req.body;
    var token = data.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }else {
                if(decoded.scope == 'admin') { //Check if token is issued to Admin
                    getConnection(function (err, con) {
                        if (err) throw err;
                        var sql = "SELECT product_id,";
                        sql += " product_nm,";
                        sql += " image_path,";
                        sql += " price,";
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
                }else {
                    return res.send("Authentication Error");
                }
            }
        });
   }
   else {
        return res.send("Authentication Error");
    }
});

//[Admin] Retrieving single product data
router.post("/product/detail/:id",function(req,res){
    var data = req.body;
    var token = data.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                if (decoded.scope == 'admin') {//Check if token is issued to Admin
                    getConnection(function (err, con) {
                        if (err) throw err;

                        var sql = "SELECT p.product_id, ";
                        sql += "p.product_nm, ";
                        sql += "p.image_path,";
                        sql += "p.price,";
                        sql += "p.ingredient,";
                        sql += "p.description ";
                        sql += "FROM product as p ";
                        sql += "where p.product_id = ?";

                        //binding product id in the where clause
                        var values = [req.params.id];

                        con.query(sql, [values], function (err, rows, fields) {
                            if (err) {
                                console.log('Error while retrieving single product');
                                return res.send(err);
                            }
                            con.release();
                            return res.json(rows);
                        });
                    });
                } else {
                    return res.send("Authentication Error");
                }
            }
        });
    }
    else {
        return res.send("Authentication Error");
    }
});

//[Admin] Updating product data
router.post('/product/:id', function(req, res, next){
    var data = req.body;
    var token = data.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }else {
                if(decoded.scope == 'admin') {//Check if token is issued to Admin
                    // getting input data
                    var product = req.body;
                    getConnection(function (err, con) {
                        if (err) throw err;

                        var sql = "UPDATE product set product_nm = ?, description = ?, image_path = ?, ingredient = ?, price = ?  where product_id = ?";

                        //binding input data into update sql
                        var values = [product.product_nm, product.description, product.filename, product.ingredient, product.price, product.product_id];

                        con.query(sql, values, function (err, result) {
                            if (err) {
                                con.rollback(function() {
                                    throw err;
                                });
                            }
                            con.commit(function(err) {
                                if (err) {
                                    con.rollback(function() {
                                        throw err;
                                    });
                                }
                                con.release();
                                console.log(result.affectedRows + " Product record updated");
                                return res.json();
                            });
                        });
                    });
                } else {
                    return res.send("Authentication Error");
                }
            }
        });
    }
    else {
        return res.send("Authentication Error");
    }
});

//[Admin] Inserting product data
router.put('/product/add', function(req, res, next){
    var data = req.body;
    var token = data.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }else {
                if(decoded.scope == 'admin') {//Check if token is issued to Admin
                    // getting input data
                    var product = req.body;

                    getConnection(function (err, con) {
                        if (err) throw err;

                        var sql = "Insert into product SELECT max(product_id) + 1, ?, ?, Now(), ?, ?, ? from product";

                        //binding input data into insert sql
                        var values = [product.product_nm, product.description, product.filename, product.price, product.ingredient];

                        con.query(sql, values, function (err, result) {
                            if (err) {
                                con.rollback(function() {
                                    throw err;
                                });
                            }
                            con.commit(function(err) {
                                if (err) {
                                    con.rollback(function() {
                                        throw err;
                                    });
                                }
                                con.release();
                                console.log(result.affectedRows + " Product record inserted");
                                return res.json();
                            });
                        });
                    });
                } else {
                    return res.send("Authentication Error");
                }
            }
        });
    }
    else {
        return res.send("Authentication Error");
    }
});

//[Admin] Deleting product data
router.delete('/product/:id', function(req, res, next){
    var data = req.body;
    var token = data.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }else {
                if(decoded.scope == 'admin') {//Check if token is issued to Admin
                    // getting input data
                    var product = req.body;
                    getConnection(function (err, con) {
                        if (err) throw err;

                        var sql = "delete from product where product_id = ?";

                        //binding input data into insert sql
                        var values = [product.product_id];

                        con.query(sql, values, function (err, result) {
                            if (err) {
                                con.rollback(function() {
                                    throw err;
                                });
                            }
                            con.commit(function(err) {
                                if (err) {
                                    con.rollback(function() {
                                        throw err;
                                    });
                                }
                                con.release();
                                console.log(result.affectedRows + " Product record deleted");
                                return res.json();
                            });
                        });
                    });
                } else {
                    return res.send("Authentication Error");
                }
            }
        });
    }
    else {
        return res.send("Authentication Error");
    }
});

module.exports = router;