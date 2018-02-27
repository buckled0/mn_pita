const pitaRoutes = require('./pita_routes');

module.exports = function(app, db) {
	pitaRoutes(app, db);
};