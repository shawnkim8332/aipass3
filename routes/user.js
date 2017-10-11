var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');
var jwt = require('jsonwebtoken');
var crypto = require('crypto'),algorithm = 'aes-256-ctr',password = 'd6F3Efeq';
var ses = require('node-ses'), client = ses.createClient({ key: 'AKIAJDKFPCWN5YGCAEHA', secret: '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' });

//User Register Function
router.post("/register",function(req,res){
    console.log(req.body);
	var user = req.body;
	getConnection(function (err, con) {
        if (err) throw err;

        var sql = "select id from users where email = ?";
        //adding email value
        var value = [user.email];

        con.query(sql, value, function (err, rows, fields) {
            if (err){
                console.log('Error while finding user: '+err);
                return res.send("Error");
            }
			else if(!rows.length) {
				console.log('No User Found during Signup');
				//start adding user to database
				addUser(user);
				return res.send("success");
			} 
			else {
				console.log("Error user already exists");
				return res.send("dupEmail");
			}
			con.release();
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

			var sql = "select id,first_name,role,password from users where email = ?";
		//encrypting password
		var cipher = crypto.createCipher(algorithm,password);
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
				if(rows[0].password == encPass) {
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
				else {
					console.log('Invalid Password');
					return res.send('notFound');
				}
			}
			con.release();
        });
	}); // end getConnection
});

//User Auth Function --old
/*
router.post("/auth",function(req,res){
	console.log("Auth Called");
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
*/

router.get("/auth/:token",function(req,res){
	var token = [req.params.token].toString();
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
                if(decoded.scope == 'admin') {
                    return res.send('Success');
                }
                else {
                    return res.send('Fail');
                }
            }
        });
    }
    else {
        return "error";
    }
});

//User Password Reset checks Function
router.post("/reset",function(req,res){
    console.log(req.body);
	var user = req.body;
	getConnection(function (err, con) {
        if (err) throw err;

        var sql = "select * from users where email = ?";
        //adding email value
        var value = [user.email];

        con.query(sql, value, function (err, rows, fields) {
            if (err){
                console.log('Error while finding user: '+err);
                return res.send("Error");
            }
			else if(!rows.length) {
				console.log('No User Found in the databse password reset');
				return res.send("notFound");
			} 
			else {
				console.log("Calling Send Email Function");
				//call send email functiom
				sendEmail(rows[0].first_name, rows[0].email);
				return res.send("success");
			}
			con.release();
        });
	}); // end getConnection
});

//generate and send token via email to reset the password.
function sendEmail(name,email) {
	console.log("names is:"+name);
	console.log("email is:"+email);
	var tokenData = {
		email: email,
		secret : 'aipEmailPasswordResetChecks',
	};
	var resetToken = jwt.sign(tokenData, 'userPassReset');
	console.log("token is:"+resetToken);
	msg = "Hi "+name+"<br/>";
	msg += "A Passowrd Rest request is made on Hello Fresh Webiste<br><br>Please click on following link to reset your password<br><br>";
	msg += "<a href='http://aip2017.webon.com.au/email-reset?resVal="+resetToken+"'>http://aip2017.webon.com.au/email-reset?resVal="+resetToken+"</a><br/><br/>";
	msg +="Please Neglect this email if request is not made by you <br/><br/>Many Thanks<br/>Hello Fresh<br/>UTS AIP 2017 Group";
	client.sendEmail({
		   to: email,
		   from: 'vatshpatel@gmail.com',
		   cc: 'vatshpatel@gmail.com',
    	   subject: 'Password Reset Request On Hello Fresh',
   	       message: msg,
		   altText: 'plain text'
		}, function (err, data, res) {
			 if (err){
				console.log('Error while Sending email: ',err);
			 }
	});
}

//verify token and update password in database
router.post("/updatepass",function(req,res){
	var data = req.body;
	var token = data.token;
	console.log("Token Got is:"+token);
	if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'userPassReset', function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                if(decoded.secret == 'aipEmailPasswordResetChecks') {
					//valid token
					console.log("decoded reset email :"+decoded.email);
					//encrypting password
					var cipher = crypto.createCipher(algorithm,password);
					var encPass = cipher.update(data.password,'utf8','hex')
					encPass += cipher.final('hex');
					updatePassword(decoded.email,encPass);
                    return res.send('Success');
                }
                else {
					//invalid token
                    return res.send('error');
                }
            }
        });
    }
    else {
        return "error";
    } 
});

//update password to database to reset the password
function updatePassword(email,password) {
	getConnection(function (err, con) {
        if (err) throw err;
        var sql = "UPDATE users set password = ? where email = ?";
        //binding input data into update sql
        var values = [password, email];
        con.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " user record updated");
        });
    });
}

//Add User if no Email Found
function addUser(user) {
	getConnection(function (err, con) {
		console.log("register Called");
		if (err) throw err;

		var sql = "Insert into users (first_name,last_name,role,email,password,created,modified) values ?";
		//encrypting password
		var cipher = crypto.createCipher(algorithm,password);
		var encPass = cipher.update(user.password,'utf8','hex')
		encPass += cipher.final('hex');
		//converting date to timestamp
		var now=new Date().toISOString().slice(0, 19).replace('T', ' ');
		//adding user values
		var values = [[user.name,user.lastname,'customer',user.email,encPass,now,now]];

		con.query(sql, [values], function (err, rows, fields) {
			if (err){
				console.log('Error while adding user: '+err);
				//return res.send(err);
			}
			console.log('user added');
			con.release();
			//return res.json(rows);
		});
	}); // end getConnection
}

module.exports = router;
