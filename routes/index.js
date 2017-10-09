var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
/*
// route middleware to verify a token
router.all('*',function(req, res, next) {
		  // check header or url parameters or post parameters for token
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
			next();
		  }
		});
	  }
	  else {
		// if there is no token
		// return an error
		//return res.status(403).send({ 
		  //  success: false, 
			//message: 'No token provided.' 
		//});
		//console.log("Accessing Data Withut Token");
		//next();
		//res.render('index.html');
		next();
	  }

});
*/

router.all('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;