let express 			= require('express');
let bodyParser		= require('body-parser');
let app 					= express();
let mongoose			= require('mongoose');
let morgan				= require('morgan');
let config 				= require('config');
let report 				= require('./app/controllers/reportsController.js');
let port 					= 8000;

let options = {
	keepAlive: 1, connectTimeoutMS: 30000
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(morgan('combined'));
}

var index					= require('./app/routes/index.js');
var pita					= require('./app/routes/pitaRoutes.js');
var useragent 		= require('express-useragent');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(useragent.express());

app.route('/pita')
	.get(report.listReports)
	.post(report.createReport);

app.route('/pita/:id')
	.get(report.reportDetails)
	.delete(report.deleteReport)
	.put(report.updateReport);

app.listen(port);

console.log("Listening on port " + port);

module.exports = app;
