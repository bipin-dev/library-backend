const WorkflowHelper = require("../services_helper/WorkflowHelper");

class WorkflowService {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
    this.workflows = {};
  }

  async initialize() {
    let path = this.config.dir.app + this.config.dir.workflows;
    let allModules = require(path);
    for (let mConfig of allModules) {
      this.workflows[mConfig.identifier] = new WorkflowHelper(
        this.config,
        mConfig,
        this.fr
      );
    }
  }

  getInstance(id) {
    if (id) {
      return this.workflows[id];
    }
    return null;
  }

  async find(req, res) {
    let params = req.params; // req.params, req.body, or req.query
    let identifier = params.workflow;

    let result = await this.get(identifier, req.user);
    res.send(result);
  }

  async search(req, res) {
    let params = req.params;
    let query = req.query;
    let id = params.workflow;
    let currentModule = this.getInstance(id);
    if (!currentModule) {
      throw new Error("No such workflow exists in our system");
    }
    let result = await currentModule.wfSearch(query, req.user);
    res.send(result);
  }
  // get blocked access user workflow according to login thing .
  async get(id, user) {
    let currentModule = this.getInstance(id);
    if (!currentModule) {
      throw new Error("No such workflow exists in our system");
    }
    let res = await currentModule.get(user);
    return res;
  }
}

module.exports = WorkflowService;
