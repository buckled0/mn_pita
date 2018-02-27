var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
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
    	db.collection('pita').insert(pita, (err, result)=> {
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