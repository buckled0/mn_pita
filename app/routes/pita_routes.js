var ObjectID 	= require('mongodb').ObjectID;
var useragent = require('express-useragent');
var Report 		= require('../models/report.js');

module.exports = function(app, db) {
	app.use(useragent.express());

	app.get('/pita/:id', (req, res)=> {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('pita').findOne(details, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.send(item);
			}
		});
	});

	app.post('/pita', (req, res) => {
		const pita = { text: req.body.body, title: req.body.title }
		var newReport = new Report(
			{
				browser: req.useragent.browser,
				version: req.useragent.version,
				os: req.useragent.os,
				platform: req.useragent.platform,
				reportText: req.body.report
			}
		);
    db.collection('pita').insert(newReport, (err, result)=> {
    	if (err) {
    		res.send({ 'error': 'An error has occured' });
    	} else {
    		res.send(result.ops[0]);
    	}
    })
  });

  app.delete('/pita/:id', (req, res) => {
  	const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('pita').remove(details, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.send('Pita ' + id + ' deleted!');
			}
		});
  });

  app.put('/pita/:id', (req, res) => {
  	const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const pita = { text: req.body.body, title: req.body.title }
		db.collection('pita').update(details, pita, (err, result) => {
			if (err) {
				res.send({'error': 'An error has occured'});
			} else {
				res.send(pita);
			}
		});
  });
};