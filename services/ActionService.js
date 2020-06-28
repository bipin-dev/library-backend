class ActionService {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    this.actions = {};
  }

  initialize() {
    let path = this.config.dir.app + this.config.dir.actions;
    console.log("action path is .. ", path);
    this.actions = require(path);
  }

  async getForm(req, res) {
    let params = req.params;
    let query = req.query;
    let id = params.action;
    let action = this.actions[id];
    let form = action && action.form ? Object.assign({}, action.form) : {};
    if (action && action.require_selection && form.values) {
      form.values = await form.values(
        this.fr.DBManager.db,
        this.fr,
        this.config,
        query,
        req.user
      );
    }
    res.send(form);
  }

  async saveForm(req, res) {
    let opts = req.body;
    let id = opts.identifier;
    let action = this.actions[id];
    let saveFn = action.save;
    let validator = action.validate;
    let valid = await validator(
      opts.values,
      this.fr.DBManager.db,
      this.fr,
      this.config,
      opts._id,
      req.user
    );
    if (!valid.isValid) {
      res.send({ actionCompleted: false, error: valid.message });
      return;
    }
    await saveFn(
      opts.values,
      this.fr.DBManager.db,
      this.fr,
      this.config,
      opts._id,
      req.user
    );
    res.send({ actionCompleted: true });
    return;
  }
}

module.exports = ActionService;
