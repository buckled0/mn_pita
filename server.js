const express 			= require('express');
const bodyParser		= require('body-parser');
const db						= require('./config/db');
const app 					= express();

const port 					= process.env.PORT || 8000;

var index						= require('./app/routes/index.js');
var pita						= require('./app/routes/pitaRoutes.js');
var useragent 	= require('express-useragent');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(useragent.express());

app.use('/', index);
app.use('/pita', pita);

app.listen(port);

console.log('Magic happens on port ' + port);

