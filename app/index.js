let express 			= require('express');
let bodyParser		= require('body-parser');
let app 					= express();
let pita			    = require('./routes/pitaRoutes.js');
let useragent 	  = require('express-useragent');
let path 					= require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(useragent.express());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/', pita);

module.exports = app;