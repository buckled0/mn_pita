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
				.get('/')
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
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com'
			}
			chai.request(server)
				.post('/')
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
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			}
			chai.request(server)
				.post('/')
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
      let report = new Report({
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			});
      report.save((err, report) => {
      	chai.request(server)
      	.get('/' + report.id)
      	.send(report)
      	.end((err, res) => {
      	    res.should.have.status(200);
      	    res.body.should.be.a('object');
      	    res.body.should.have.property('browser');
      	    res.body.should.have.property('version');
      	    res.body.should.have.property('platform');
      	    res.body.should.have.property('reportText');
      	    res.body.should.have.property('_id').eql(report.id);
      	  done();
      	});
      });
    });  
	});

	describe('/PUT/:id report', () => {
		it('it should UPDATE a report given the id', (done) => {
			let report = new Report({
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			});
			let newReport = new Report({
				browser: 'Safari',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				reportText: 'New Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			});
			report.save((err, report) => {
				chai.request(server)
					.put('/' + report.id)
					.send(newReport)
					.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('message').eql('Report updated!');
							res.body.report.should.have.property('browser').eql('Safari');
							res.body.report.should.have.property('reportText').eql('New Test');
						done();
					});
			}) 
		});
	});

	describe('/DELETE/:id report', () => {
		it('it should DELETE a book given the id', (done) => {
			let report = new Report({
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com',
				username: 'TestUser'
			});
			report.save((err, report) => {
				chai.request(server)
					.delete('/' + report.id)
					.end((err, res) => {
							res.should.have.status(200);
							res.body.should.have.property('message').eql('Report deleted!');
							res.body.result.should.have.property('ok').eql(1);
							res.body.result.should.have.property('n').eql(1);
						done();
					});
			});
		});
	});

});
