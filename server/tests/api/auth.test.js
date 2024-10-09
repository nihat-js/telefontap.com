const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

chai.use(chaiHttp);
const { expect } = chai;

const app = "localhost:5000"

// Define a sample route
app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

// Tests
describe('User API', function () {
  it('should return user data', function (done) {
    chai.request(app)  // Using chai-http to make the request
      .get('/user')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'john');
        done();
      });
  });
});
