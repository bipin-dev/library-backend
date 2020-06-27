const ModalEntity = require("../services_helper/ModalEntity");

class DBManager {
  constructor(framework, config) {
    this.fr = framework;
    this.config = config;
  }

  initialize() {
    let path = this.config.dir.app + this.config.dir.models;
    let entities = require(path);
    this.db = {};
    for (var enty of entities) {
      this.db[enty.collection_name] = new ModalEntity(enty);
    }
  }
}

module.exports = DBManager;
