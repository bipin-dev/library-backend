class RouterManager {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
  }

  initialize() {
    let path = this.config.dir.app + this.config.dir.routes;

    let routes = require(path);
    return new Promise((resolve, reject) => {
      for (let r of routes) {
        let strategy = r.strategy || "jwt";
        if (r.authenticate) {
          this.fr.api[r.request_type](
            r.route,
            this.fr.passport.authenticate(strategy, {
              session: false
            }),
            async (req, res) => {
              if (r.method) {
                await this.fr[r.handler][r.method](req, res);
              } else {
                await this.fr[r.handler].handler(req, res);
              }
            }
          );
        } else {
          this.fr.api[r.request_type](r.route, async (req, res) => {
            if (r.method) {
              await this.fr[r.handler][r.method](req, res);
            } else {
              await this.fr[r.handler].handler(req, res);
            }
          });
        }
      }
      return resolve();
    });
  }
}

module.exports = RouterManager;
