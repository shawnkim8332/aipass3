var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');
var jwt = require('jsonwebtoken');
var crypto = require('crypto'),algorithm = 'aes-256-ctr',password = 'd6F3Efeq';
var cipher = crypto.createCipher(algorithm,password)


//User Register Function
router.post("/register",function(req,res){
    console.log(req.body);
	var user = req.body;
	getConnection(function (err, con) {
		console.log("register Called");
		if (err) throw err;

		var sql = "Insert into users (first_name,last_name,role,email,password,created,modified) values ?";
		//encrypting password
		var encPass = cipher.update(user.password,'utf8','hex')
		encPass += cipher.final('hex');
		//converting date to timestamp
		var now=new Date().toISOString().slice(0, 19).replace('T', ' ');
		//adding user values
		var values = [[user.name,user.lastname,'customer',user.email,encPass,now,now]];

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

        var sql = "select id,first_name,role from users where email = ? AND password = ?";
		//encrypting password
		var encPass = cipher.update(user.password,'utf8','hex')
		encPass += cipher.final('hex');
        //adding user values
        var value = [user.email,encPass];

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
				var tokenData = {
					username: rows[0].first_name,
					scope: rows[0].role,
					id: rows[0].id
				};
				var token = jwt.sign(tokenData, 'userLogin');
				return res.json({
					success: 'true',
					name: rows[0].first_name,
					token: token
				});
			}
			con.release();
        });
	}); // end getConnection
});

//User Auth Function
router.post("/auth",function(req,res){
	console.log("Austh Called");
    console.log(req.body);
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	  // decode token
	  if (token) {
		// verifies secret and checks exp
		jwt.verify(token, 'userLogin', function(err, decoded) {      
		  if (err) {
			console.log(err);
			return res.json({ success: false, message: 'Failed to authenticate token.' });
		  } 
		  else {
			// if everything is good, save to request for use in other routes
			console.log("token Scope : ",decoded.scope);
			if(decoded.scope == 'admin') {
				return "Success";
			}
			else {
				return "Log-In-As-Admin";
			}
		  }
		});
	  }
	  else {
		return "error";
	  }
});

//check if email already exists on database
function checkEmailExists(email) {
	getConnection(function (err, con) {
        if (err) throw err;

        var sql = "select id from users where email = ?";
        //adding email value
        var value = [email];

        con.query(sql, value, function (err, rows, fields) {
            if (err){
                console.log('Error while finding user: '+err);
                return res.send("Error");
            }
			else if(!rows.length) {
				console.log('No User Found during Signup');
				return 1;
			} 
			else {
				console.log("Error user already exists");
				return 0;
			}
			con.release();
        });
	}); // end getConnection
}

module.exports = router;
