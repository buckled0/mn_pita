var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var ReportSchema = new Schema ({
	browser: { type: String, required: true },
	version: { type: String, required: true },
	os: { type: String, required: true },
	platform: { type: String, required: true },
	reportText: { type: String, required: true },
	userId: { type: Number, required: true },
	username: { type: String, required: true },
	userEmail: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
},{ version: false });

ReportSchema.pre('save', next => {
	now = new Date();
	if(!this.createdAt) {
		this.createdAt = now;
	}
	next();
});

module.exports = mongoose.model('report', ReportSchema);