const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const appConfig = require("../config");
// you need to put auth token for it
let app_url = "http://localhost:4000";
if (appConfig.environment == "prod") {
  app_url = appConfig.app_url;
}
// manually put token here
let mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY0ZDIwZTRlMjhmMmVhMzM2MDI5Y2IiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkzMjk4OTAyLCJleHAiOjE1OTMzODUzMDIsImF1ZCI6Imh0dHBzOi8vKi5iaXBpbi5pbyIsImlzcyI6ImxpYnJhcnkiLCJzdWIiOiJhbm9ueW1vdXMifQ.pURDBNM0unOn0uBaFi6VSbIphEwKDp6tAf89ADzAu88";

describe("GET BOOKS", () => {
  it("should get all books", (done) => {
    chai
      .request(app_url)
      .get("/wrk/book_admin")
      .set("Authorization", "Bearer " + mockToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.typeOf(res.body, "object");
        done();
      });
  });
});
