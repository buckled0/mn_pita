const express 			= require('express');
const bodyParser		= require('body-parser');
const app 				= express();
const pita			    = require('./routes/pitaRoutes.js');
const useragent 	    = require('express-useragent');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(useragent.express());

app.use('/', pita);

module.exports = app;