class NavService {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    this.actions = {};
  }
  initialize() {
    let path = this.config.dir.app + this.config.dir.navs;
    this.navs = require(path);
  }

  get(req, res) {
    let requiredNavs = this.getNavsBasedOnAcces(req.user);
    res.send(requiredNavs);
  }

  getNavsBasedOnAcces(user) {
    let roles = user.roles;
    console.log("roles getting navs ....", roles);
    if (!roles) {
      return [];
    }
    return this.navs.filter((n) => n.access.includes(roles));
  }
}

module.exports = NavService;
