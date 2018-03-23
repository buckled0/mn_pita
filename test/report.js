process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Report = require('../app/models/report');
let Factory = require('./reportFactory');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let Cleaner = require('database-cleaner');
let dbCleaner = new Cleaner('mongodb');

chai.use(chaiHttp);

describe('Reports', () => {
	var report;
	var reportPromise = Factory.attrs('Report').then(reportPromise => { report = reportPromise; });

	var reports;
	var reportsArray = Factory.attrsMany('Report', 5).then(reportsArray => { reports = reportsArray; });

	beforeEach((done) => {
		Report.remove({}, (err) => {
			done();
		});
	});

	afterEach((done) => {
  	dbCleaner.clean(mongoose.connection.db, () => {
    	done();
  	});
	});

	describe('/Get report', () => {
		it('it should GET all reports', (done) => {
			chai.request(server)
				.get('/list')
				.set('Content-Type', 'application/json')
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
			var reportMissingUsername = {
				browser: 'Chrome',
				version: '12',
				os: 'High Sierra',
				platform: 'Mac',
				reportText: 'Test',
				userId: 111111,
				userEmail: 'test@test.com'
			}
			chai.request(server)
				.post('/create')
				.set('Content-Type', 'application/json')
				.send(reportMissingUsername)
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
			chai.request(server)
				.post('/create')
				.set('Content-Type', 'application/json')
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
			Factory.cleanUp;	
		})
	});

	describe('/GET/:id report', () => {
		it('it should GET a report by the given id', (done) => {
			new Report(report).save((err, report) => {
      	chai.request(server)
      		.get('/report/' + report.id)
      		.set('Content-Type', 'application/json')
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
      	Factory.cleanUp;
    	});
    });  
	});

	describe('/PUT/:id report', () => {
		it('it should UPDATE a report given the id', (done) => {
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
			new Report(report).save((err, report) => {
				chai.request(server)
					.put('/report/' + report.id)
					.set('Content-Type', 'application/json')
					.send(newReport)
					.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('message').eql('Report updated!');
							res.body.report.should.have.property('browser').eql('Safari');
							res.body.report.should.have.property('reportText').eql('New Test');
						done();
					});
			});	
			Factory.cleanUp; 
		});
	});

	describe('/DELETE/:id report', () => {
		it('it should DELETE a book given the id', (done) => {
			new Report(report).save((err, report) => {
				chai.request(server)
					.delete('/report/delete/' + report.id)
					.set('Content-Type', 'application/json')
					.end((err, res) => {
							res.should.have.status(200);
							res.body.should.have.property('message').eql('Report deleted!');
							res.body.result.should.have.property('ok').eql(1);
							res.body.result.should.have.property('n').eql(1);
						done();
					});
				Factory.cleanUp;	
			});
		});
	});

	describe('/GET/:id user', () => {
		it('it should load all issues by a single user id', (done) => {
			var userId = 111111;
			Report.collection.insert(reports);
			chai.request(server)
				.get('/user/' + userId)
				.set('Content-Type', 'application/json')
				.send(reports)
				.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(5);
					done();
				});
			Factory.cleanUp;	
		});
	});
});
