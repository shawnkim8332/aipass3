var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');
var jwt = require('jsonwebtoken');


//User Register Function
router.post("/register",function(req,res){
	console.log("register Called");
    console.log(req.body);
	var user = req.body;
	getConnection(function (err, con) {
        if (err) throw err;

        var sql = "Insert into users (first_name,last_name,role,email,password,created,modified) values ?";
		var now=new Date().toISOString().slice(0, 19).replace('T', ' ');
        //adding user values
        var values = [[user.name,user.lastname,'customer',user.email,user.password,now,now]];

        con.query(sql, [values], function (err, rows, fields) {
            if (err){
                console.log('Error while adding user: '+err);
                return res.send(err);
            }
            console.log('user added');
            con.release();
            return res.json(rows);
        });
	}); // end getConnection
});


//User Login Function
router.post("/login",function(req,res){
	console.log("Login Called");
    console.log(req.body);
	var user = req.body;
	getConnection(function (err, con) {
        if (err) throw err;

        var sql = "select id,first_name from users where email = ? AND password = ?";
        //adding user values
        var value = [user.email,user.password];

        con.query(sql, value, function (err, rows, fields) {
            if (err){
                console.log('Error while finding user: '+err);
                return res.send("Error");
            }
			else if(!rows.length) {
				console.log('No User Found');
				return res.send('notFound');
			} 
			else {
				console.log('user found: '+rows);
				var token = jwt.sign(rows, 'userLogin');
				return res.json({
					success: 'true',
					id: rows[0].id,
					name: rows[0].first_name,
					token: token
				});
			}
			con.release();
        });
	}); // end getConnection
});

module.exports = router;
