var mysql = require('mysql');
var getConnection = require('./routes/db');

var transaction = require('node-mysql-transaction');

var trCon = transaction({
    // mysql driver set
    connection: [mysql.createConnection,{
        // mysql connection config
        user: "vatsh",
        password:"vatshpatel95",
        host: "aip.crpau3li1ooe.us-east-2.rds.amazonaws.com",
        database:"aip_db"
    }],

    dynamicConnection: 32,
    idleConnectionCutoffTime: 1000,
    timeout:3600
});

var chain = trCon.chain();

chain.
on('commit', function(){
    console.log('number commit');
}).
on('rollback', function(err){
    console.log(err);
});



chain.
query('update aip_db.week11_account set amount = amount+ 100 where account_id = 1234').
query('update aip_db.week11_account set amount = amount+ 100 where account_id = 1234').
query('update aip_db.week11_account set amount = amount+ 100 where account_id = 1234').
query('update aip_db.week11_account set amount = amount+ 100 where account_id = 1234')
;

