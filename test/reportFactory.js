var Factory = require('factory-girl').factory;
var Report 	= require('../app/models/report');
var faker 	= require('faker');

Factory.define('Report', Report, {
	browser: 'Chrome',
	version: '1.0',
	os: 'High Sierra',
	platform: 'Mac',
	reportText: faker.lorem.paragraph(),
	userId: 111111,
	username: faker.internet.userName(),
	userEmail: faker.internet.email()
});

module.exports = Factory;