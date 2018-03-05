var Report = require('../models/report.js');

exports.list_reports = function(req, res) {
	Report.find(function(err, report) {
		if (err) {
			res.send(err);
		}
		res.json(report);
	});
};

exports.report_create_post = function(req, res) {
	var newReport = new Report({
		browser: req.useragent.browser,
		version: req.useragent.version,
		os: req.useragent.os,
		platform: req.useragent.platform,
		reportText: req.body.report,
		userId: req.body.userId,
		username: req.body.username,
		userEmail: req.body.email
	});

	newReport.save(function(err){
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Report created, id:' + newReport.id });
	});
};

exports.report_details = function(req, res) {
	const id = req.params.id;
	Report.findById(id, function(err, report) {
		if (err) {
			res.send(err);
		}
		res.json(report);
	});
};

exports.delete_report = function(req, res) {
	const id = req.params.id;
	Report.findByIdAndRemove(id, function(err, item) {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send('Pita ' + id + ' deleted!');
		}
	});
};

exports.update_report = function(req, res) {
	const id = req.params.id;
	var newReport = new Report({
		browser: req.useragent.browser,
		version: req.useragent.version,
		os: req.useragent.os,
		platform: req.useragent.platform,
		reportText: req.body.report,
		userId: req.body.userId,
		username: req.body.username,
		userEmail: req.body.email
	});
	Report.findByIdAndUpdate(id, newReport, function(err, result) {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send(pita);
		}
	});
};
