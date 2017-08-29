var mySQL = require('mysql');
var pool  = mySQL.createPool({

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