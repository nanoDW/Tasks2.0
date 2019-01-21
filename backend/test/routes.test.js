const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
require("sinon-mongoose");
const { User } = require("../models/schemas");

describe("Get all users", () => {
  it("should return all users", function(done) {
    const UserMock = sinon.mock(User);
    const expectedResult = { status: true, user: [] };
    UserMock.expects("find").yields(null, expectedResult);
    User.find(function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error", function(done) {
    const UserMock = sinon.mock(User);
    const expectedResult = { status: false, error: "Something went wrong" };
    UserMock.expects("find").yields(expectedResult, null);
    User.find(function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
