const express 			= require('express');
const MongoClient		= require('mongodb').MongoClient;
const bodyParser		= require('body-parser');
const db						= require('./config/db');
const app 					= express();

const port 					= process.env.PORT || 8000;

var pita						= require('./app/routes/pita_routes.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/pita', pita);

app.listen(port);

console.log('Magic happens on port ' + port);
