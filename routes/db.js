var mySQL = require('mysql');

//Database Pool Connection Declaration
var pool  = mySQL.createPool({
    host     : 'aip.crpau3li1ooe.us-east-2.rds.amazonaws.com',
	port	 : '3306',
    user     : 'vatsh',
    password : 'vatshpatel95',
    database : 'aip_db'
});

//Database Pool Connection Establishment
var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        if(err) {
            return cb(err);
			console.log("Database connection error");
        }
        cb(null, connection);
    });
};

module.exports = getConnection;