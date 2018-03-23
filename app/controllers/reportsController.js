var Report = require('../models/report.js');

exports.new_report = function(req, res) {
	res.render('pita');
}

exports.list_reports = function(req, res) {
	Report.find(function(err, report) {
		if (err) {
			res.send(err);
		} else {
			if (isJsonRequest(req)) {
				res.json(report);
			} else {
				res.render('pitaReports', {
					result: report
				});
			}
		}
	});
};

exports.report_create_post = function(req, res) {
	var newReport = new Report(Object.assign({}, req.useragent, req.body));
	newReport.save(function(err, report){
		if (err) {
			res.send(err);
		} else {
			if (isJsonRequest(req)) {
				res.json({ message: 'Report created', report });
			}
			else {
				res.render('pitaSuccess', {
					result: report
				});
			}
		}
	});
};

exports.report_details = function(req, res) {
	const id = req.params.id;
	Report.findById(id, function(err, report){
		if (err) {
			res.send(err);
		} else {
			if (isJsonRequest(req)) {
				res.json(report);
			}
		}
	});
};

exports.delete_report = function(req, res) {
	const id = req.params.id;
	Report.remove({ _id: id }, (err, result) => {
		if (isJsonRequest(req)) {
			res.json({ message: 'Report deleted!', result })
		}
	});	
};

exports.update_report = function(req, res) {
	const id = req.params.id;
	var newReport = new Report(Object.assign({}, req.useragent, req.body));	
	Report.findById(id, (err, report) => {
		if (err) { res.send(err); } 
		Object.assign(report, newReport).save((err, book) => {
			if(err) res.send(err);
			if (isJsonRequest(req)) {
				res.json({ message: 'Report updated!', report });
			}
		});
	});	
};

exports.load_user_reports = function(req, res) {
	const id = req.params.id;
	Report.find({ 'userId' : id }, (err, reports) => {
		if (err) {
			res.send(err);
		} else {
			if (isJsonRequest(req)) {
				res.json(reports);
			}
		}
	});
};

function isJsonRequest(req) {
	return req.get('content-type') === 'application/json';
}