const assert = require("chai").assert;
const path = require("path");
const config = require("../config");
const dbDir = path.resolve(__dirname + "/../services/DBManager");
const DBManager = require(dbDir);

// const assert = require("assert");
const dbManager = new DBManager(config, this);
describe("Mongoose Connection", function() {
  it("DB Connection status should return 1", function() {
    let status = dbManager.testDBConnection();
    assert.equal(1, status);
  });
});
