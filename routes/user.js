var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var getConnection = require('./db');
var jwt = require('jsonwebtoken');
var crypto = require('crypto'),algorithm = 'aes-256-ctr',password = 'd6F3Efeq';
var ses = require('node-ses'), client = ses.createClient({ key: '---', secret: '---' });

//User Register Function
router.post("/register",function(req,res){
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
						token: token,
						email: user.email
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

router.post("/auth/",function(req,res){
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
	var tokenData = {
		email: email,
		secret : 'aipEmailPasswordResetChecks',
	};
	var resetToken = jwt.sign(tokenData, 'userPassReset');
	msg = "Hi "+name+"<br/>";
	msg += "A Passowrd Reset request is made on Hello Fresh Webiste<br><br>Please click on following link to reset your password<br><br>";
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

//send Product Bought email to user
router.post("/confirmEmail",function(req,res){
	var data = req.body;
	var products = data.products;
	var msg = "Hi, There<br/><br/>";
	msg+= "Thank You For Making a recent order on Hello Fresh<br/> Here is a summary of order made<br/>";
	var i=1;
	for(j in products) {
		msg+= i+". "+products[j].name+" "+products[j].price+" <br/>";
		i++;
	}
	msg +="<br/>Many Thanks<br/>Hello Fresh<br/>UTS AIP 2017 Group";
	client.sendEmail({
		   to: data.email,
		   from: 'vatshpatel@gmail.com',
		   cc: 'vatsh@macrison.com.au',
    	   subject: 'new Order On Hello Fresh',
   	       message: msg,
		   altText: 'plain text'
		}, function (err, data, res) {
			 if (err){
				console.log('Error while Sending email: ',err);
				return res.send("error");
			 }
	});
	return res.send("success");
});

//verify token and update password in database
router.post("/updatepass",function(req,res){
	var data = req.body;
	var token = data.token;
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
                if (err) throw err;
            });
        });
    });
}

//Add User if no Email Found
function addUser(user) {
	getConnection(function (err, con) {
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
            if (err) {
                console.log('Error while adding user: '+err);
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
                if (err) throw err;
            });
		});
	}); // end getConnection
}

module.exports = router;
