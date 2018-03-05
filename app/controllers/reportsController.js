let mongoose = require('mongoose');
let Report = require('../models/report.js');

function listReports(req, res) {
	let query = Report.find({});
	query.exec((err, report) => {
		if (err) {
			res.send(err);
		}
		res.json(report);
	});
};

function createReport(req, res) {
	var newReport = new Report({
		browser: req.useragent.browser,
		version: req.useragent.version,
		os: req.useragent.os,
		platform: req.useragent.platform,
		reportText: req.body.report,
		userId: req.body.userId,
		username: req.body.username,
		userEmail: req.body.userEmail
	});
	newReport.save((err, report) => {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Report created', report });
		}
	});
};

function reportDetails(req, res) {
	const id = req.params.id;
	Report.findById(id, function(err, report) {
		if (err) {
			res.send(err);
		} else {
			res.json(report);
		}
	});
};

function deleteReport(req, res) {
	const id = req.params.id;
	Report.findByIdAndRemove(id, function(err, item) {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send('Pita ' + id + ' deleted!');
		}
	});
};

function updateReport(req, res) {
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

module.exports = { listReports, createReport, reportDetails, deleteReport, updateReport };
