const _ = require("underscore");

class AuthenticationService {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
  }

  initialize() {}

  handleAdminLogin(req, res) {
    // extra overhead no need remove later
    if (!req.user) {
      res.send({ authenticated: false });
    }
    this.fr.PassportService.signJWT(_.pick(req.user, "_id", "username")).then(
      (token) => {
        res.send({
          token,
          authenticated: true,
          user: _.omit(req.user, "password")
        });
      }
    );
  }

  handleUserLogin(req, res) {
    if (!req.user) {
      res.send({ authenticated: false });
    }
    this.fr.PassportService.signJWT(_.pick(req.user, "_id", "username")).then(
      (token) => {
        res.send({
          token,
          authenticated: true,
          user: _.omit(req.user, "password")
        });
      }
    );
  }

  async findUser(data) {
    let result = await this.fr.DBManager.db.users.find(data);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return {
        message: "Login details are wrong",
        authenticated: false
      };
    }
  }

  async findAdmin(data) {
    console.log("finding  admin data is ... ", data);
    let result = await this.fr.DBManager.db.admins.find(data);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return {
        message: "Login details are wrong",
        authenticated: false
      };
    }
  }

  async logout(req, res) {
    console.log("logging out ");
    req.logout();
    res.send({ status: "logged_out" });
  }
}

module.exports = AuthenticationService;
