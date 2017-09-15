var mySQL = require('mysql');
var pool  = mySQL.createPool({

    host     : 'aip.crpau3li1ooe.us-east-2.rds.amazonaws.com',
	port	 : '3306',
    user     : 'vatsh',
    password : 'vatshpatel95',
    database : 'aip_db'
	
});
var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if(err) {
            return cb(err);
			console.log("Database connection error");
        }
        cb(null, connection);
    });
};
module.exports = getConnection;