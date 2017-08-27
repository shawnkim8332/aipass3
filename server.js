//Server File Called As node Index
//Stating Required Classes
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var product = require('./routes/product');

//App Definitions
var app = express();

//Server Ports
var port = 3000;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Express Router
var router = express.Router();

//Router Functions
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    next();
});

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Cors Policy Definition
var cors = require('cors')
app.use(cors());

//Body Parser For App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);
app.use('/api', product);

//Cors Setup For App
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Static Folder For App
app.use(express.static('views'));

//Check Server Startup
try {
	app.listen(port, function(){
		console.log('Server started on port'+port);
	})
} 
catch (e) {
    console.log('There was an error', e);
}
