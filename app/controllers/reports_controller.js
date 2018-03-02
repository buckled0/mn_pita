var useragent 	= require('express-useragent');
var Report 			= require('../models/report.js');

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

	db.collection('pita').insert(newReport, (err, result)=> {
		if (err) {
			res.send({ 'error': 'An error has occured' });
		} else {
			res.send(result.ops[0]);
		}
	});
};

exports.report_details = function(req, res) {
	const id = req.params.id;
	const details = { '_id': new ObjectID(id) };
	db.collection('pita').findOne(details, (err, item) => {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send(item);
		}
	});
};

exports.delete_report = function(req, res) {
	const id = req.params.id;
	const details = { '_id': new ObjectID(id) };
	db.collection('pita').remove(details, (err, item) => {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send('Pita ' + id + ' deleted!');
		}
	});
};

exports.update_report = function(req, res) {
	const id = req.params.id;
	const details = { '_id': new ObjectID(id) };
	var newReport = new Report(
		{
			browser: req.useragent.browser,
			version: req.useragent.version,
			os: req.useragent.os,
			platform: req.useragent.platform,
			reportText: req.body.report,
			userId: req.body.userId,
			username: req.body.username,
			userEmail: req.body.email
		}
	);
	db.collection('pita').update(details, newReport, (err, result) => {
		if (err) {
			res.send({'error': 'An error has occured'});
		} else {
			res.send(pita);
		}
	});
};
