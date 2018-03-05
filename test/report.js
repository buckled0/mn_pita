process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Report = require('../app/models/report');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
	beforeEach((done) => {
		Report.remove({}, (err) => {
			done();
		});
	});

	describe('/Get report', () => {
		it('it should GET all reports', (done) => {
			chai.request(server)
				.get('/pita')
				.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(0);
	
					done();
				});
		});
	});	

	describe('/Post report', () => {
		it('it should not post a report with a username', (done) => {
			let report = {
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				report: 'Test',
				userId: 111111,
				userEmail: 'test@test.com'
			}
			chai.request(server)
				.post('/pita')
				.send(report)
				.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('errors');
						res.body.errors.should.have.property('username');
						res.body.errors.username.should.have.property('kind').eql('required');
					done();	
				});
		})
	});

	describe('/Post report', () => {
		it('it should POST a report', (done) => {
			let report = {
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				report: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			}
			chai.request(server)
				.post('/pita')
				.send(report)
				.end((err, res) => {	
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('Report created');
						res.body.report.should.have.property('browser');
						res.body.report.should.have.property('version');
						res.body.report.should.have.property('os');
						res.body.report.should.have.property('platform');
						res.body.report.should.have.property('reportText');
						res.body.report.should.have.property('userId');
						res.body.report.should.have.property('userEmail');
						res.body.report.should.have.property('username');
					done();	
				});
		})
	});

	describe('/GET/:id report', () => {
		it('it should GET a report by the given id', (done) => {
			let newReport = new Report({
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				report: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			});

			newReport.save((err, report) => {
				chai.request(server)
					.get('/pita/' + report.id)
					.send(newReport)
					.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('browser');
							res.body.should.have.property('version');
							res.body.should.have.property('os');
							res.body.should.have.property('platform');
							res.body.should.have.property('reportText');
							res.body.should.have.property('userId');
							res.body.should.have.property('userEmail');
							res.body.should.have.property('username');
							res.body.should.have.property('_id').eql(report.id);
						done();
					});
			});
		});
	});
});
