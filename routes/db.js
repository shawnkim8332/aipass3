var mySQL = require('mysql');
var pool  = mySQL.createPool({

<<<<<<< HEAD
    host     : 'localhost',
    user     : 'root',
    password : 'Qw123789',
    database : 'aip_db' 
/*
    host     : 'ourcityshop.com.au',
    user     : 'ourcity9_aip2017',
    password : 'Minmin@1',
    database : 'ourcity9_aip2017_uts'
*/
=======
    host     : 'aip.crpau3li1ooe.us-east-2.rds.amazonaws.com',
	port	 : '3306',
    user     : 'vatsh',
    password : 'vatshpatel95',
    database : 'aip_db'
	
 /*   host     : 'localhost',
    user     : 'aipgroup',
    password : 'aipgroup',
    database : 'aipgroup' */
>>>>>>> 62940f0caa7a5340c214ba0059754d726d024bec
});
var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if(err) {
            return cb(err);
        }
        cb(null, connection);
    });
};
module.exports = getConnection;