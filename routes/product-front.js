var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var getConnection = require('./db');

//Retrieving product list from database
router.get("/product/list",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;
		
		//var sql = "SELECT p.product_id,p.product_nm, p.image_path,p.price,p.ingredient,p.description,CONCAT('[', COALESCE( GROUP_CONCAT(CONCAT('{description:\"', r.description, '\", user_name:\"', u.first_name,'\"}')),''), ']') AS reviewlist FROM aip_db.product p LEFT JOIN aip_db.reviews r ON r.product_id = p.product_id LEFT JOIN aip_db.users u ON u.id = r.user_id GROUP BY p.product_id";
		
	//	var sql = "SELECT p.product_id,p.product_nm, p.image_path,p.price,p.ingredient,p.description,CONCAT('[', COALESCE( GROUP_CONCAT(CONCAT('{description:', r.description, ', user_name:', u.first_name,'}')),''), ']') AS reviewlist FROM aip_db.product p LEFT JOIN aip_db.reviews r ON r.product_id = p.product_id LEFT JOIN aip_db.users u ON u.id = r.user_id GROUP BY p.product_id";
		
		
		//var sql = "SELECT p.product_id,p.product_nm, p.image_path,p.price,p.ingredient,p.description, CONCAT('[', GROUP_CONCAT(CONCAT('{description:\"', r.description, '\", user_name:\"', u.first_name,'\"}')), ']') reviewlist FROM aip_db.product p LEFT JOIN aip_db.reviews r ON r.product_id = p.product_id LEFT JOIN aip_db.users u ON u.id = r.user_id GROUP BY p.product_id";
		
		var sql = "SELECT p.product_id,p.product_nm, p.image_path,p.price,p.ingredient,p.description, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('description', r.description, 'user_name', u.first_name)), ']') reviewlist FROM aip_db.product p LEFT JOIN aip_db.reviews r ON r.product_id = p.product_id LEFT JOIN aip_db.users u ON u.id = r.user_id GROUP BY p.product_id";
		
		
        con.query(sql, function (err, rows, fields) {
            if (err){
                console.log('Error while retrieving product list data');
                con.release();
                return res.send(err);
            }
			console.log("Pdoduct front data sent",rows);
            return res.json(rows);
        });
		con.release();
    });
});

router.post("/review/add",function(req,res){
	var data = req.body;
	var token = data.token;
	console.log("Product Id is "+data.product_id+" Revies is :"+data.review);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userLogin', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
				var userId = decoded.id;
					 console.log("User Id is :"+userId);
                // if everything is good, save to request for use in other routes
				getConnection(function (err, con) {
        			if (err) throw err;
					 
					 var sql = "INSERT into aip_db.reviews (product_id, user_id, description, reg_date, modified_date) values(?,?,?,now(),now())";
					 var values = [data.product_id,userId,data.review];
					  con.query(sql, values, function (err, result) {
						if (err) throw err;
						console.log("Review Added");
						return res.json("rAdded");
					  });
				con.release();
        		});
            }
        });
    }
    else {
        return "error";
    }
});


module.exports = router;