var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var getConnection = require('./db');

//Retrieving product list from database
router.get("/product/list",function(req,res){
    getConnection(function (err, con) {
        if (err) throw err;
		
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
//function to add reviews
router.post("/review/add",function(req,res){
	var data = req.body;
	var token = data.token;
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
//function to list reviews
router.post("/review/userReviewList",function(req,res){
	var data = req.body;
	var token = data.token;
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
					 
					 var sql = "SELECT r.review_id,r.description,p.product_nm from aip_db.reviews r INNER JOIN aip_db.product p ON r.product_id = p.product_id where r.user_id = 8;";
					 var values = [userId];
					  con.query(sql, values, function (err, rows, fields) {
						if (err) throw err;
						return res.json(rows);
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

//function to update reviews
router.post("/review/update",function(req,res){
	var data = req.body;
	var token = data.token;
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
                // if everything is good, save to request for use in other routes
				getConnection(function (err, con) {
        			if (err) throw err;
					 
					 var sql = "UPDATE aip_db.reviews r SET r.description = ? WHERE r.review_id = ? AND r.user_id = ?";
					 var values = [data.review,data.review_id,userId];
					  con.query(sql, values, function (err, result) {
						if (err) throw err;
						console.log("Review Added");
						return res.json("rUpdated");
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

//function to Delete reviews
router.post("/review/delete",function(req,res){
	var data = req.body;
	var token = data.token;
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
                // if everything is good, save to request for use in other routes
				getConnection(function (err, con) {
        			if (err) throw err;
					 
					 var sql = "delete from aip_db.reviews  where review_id = ? and user_id = ? limit 1";
					 var values = [data.review_id,userId];
					  con.query(sql, values, function (err, result) {
						if (err) throw err;
						console.log("Review Deleted");
						return res.json("rDeleted");
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