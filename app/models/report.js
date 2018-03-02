var Report = function (data) {
	this.data = data;
}

Report.findById = function (id, callback) {
	db.collection('pita').findOne(details, (err, data) => {
		if (err) {
			callback(err);
		} else {
			callback(null, new Report(data))
		}
	});
}

module.exports = Report;