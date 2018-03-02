var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var ReportSchema = new Schema ({
	browser: String,
	version: String,
	os: String,
	platform: String,
	reportText: String,
	userId: Number,
	username: String,
	userEmail: String
});

module.exports = mongoose.model('Report', ReportSchema);