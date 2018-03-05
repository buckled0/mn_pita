process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Report = require('../app/models/report');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Report', () => {
	beforeEach((done) => {
		Report.remove({}, (err) => {
			done();
		});
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
