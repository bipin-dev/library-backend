const chai = require("chai");
const assert = chai.assert;
var expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const framework = require("../index");

const DBManager = framework.DBManager;

describe("Mongoose Connection", function() {
  it("DB Connection status should return 1", function() {
    let status = DBManager.testDBConnection();
    assert.equal(1, status);
  });
});
