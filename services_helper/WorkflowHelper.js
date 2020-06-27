class WorkflowHelper {
  constructor(config, mConfig, framework) {
    this.config = config;
    this.mConfig = mConfig;
    this.fr = framework;
  }

  isPermission(user) {
    let roles = user.roles;
    if (this.mConfig.access && this.mConfig.access.includes(roles)) {
      return true;
    }
    return false;
  }

  async wfSearch(filter, user) {
    if (!this.isPermission(user)) {
      return { error: "Your Not Allowed to access this page" };
    }
    return this.searchQuery(filter.search);
  }

  async searchQuery(val) {
    let query = {};
    if (this.mConfig.searchField) {
      let re = new RegExp(val, "gi");
      query[this.mConfig.searchField] = { $regex: re };
    }
    let filter = this.mConfig.filter || {};
    if (typeof filter == "function") {
      filter = filter(this.fr, user);
    }
    query = Object.assign(query, filter);
    let coll =
      this.mConfig.db_config && this.mConfig.db_config.coll
        ? this.mConfig.db_config.coll
        : "";
    return this.fr.DBManager.db[coll].find(query).then((res) => {
      return res;
    });
  }

  async get(user) {
    if (!this.isPermission(user)) {
      return { error: "Your Not Allowed to access this page" };
    }
    let items = await this.getData(user);
    if (this.mConfig.formatter && typeof this.mConfig.formatter == "function") {
      items = await this.mConfig.formatter(items, this.fr, user);
    }
    return this.toStructure(items);
  }

  toStructure(items) {
    return {
      items: items,
      identifier: this.mConfig.identifier,
      header: this.mConfig.header,
      pageTitle: this.mConfig.pageTitle,
      mType: this.mConfig.mType,
      top_action: this.mConfig.top_action,
      inline_action: this.mConfig.inline_action,
      filter: this.mConfig.filter,
      display: this.mConfig.display,
      searchEnabled: this.mConfig.searchEnabled || false
    };
  }

  async fetchForVisual() {
    let updatedItems = [];
    if (this.mConfig.items) {
      let allModule = this.mConfig.items;
      for (let singleModule of allModule) {
        let result = await this.getEach(singleModule);
        updatedItems.push(result);
      }
      return updatedItems;
    } else {
      return updatedItems;
    }
  }

  async getEach(mChild) {
    let res = [];
    if (mChild.module) {
      let id = mChild.identifier;
      res = this.fr.ModuleService.get(id);
    }
    if (mChild.component) {
      let id = mChild.identifier;
      res = this.fr.ComponentService.get(id);
    }
    return res;
  }

  async getData(user) {
    let coll =
      this.mConfig.db_config && this.mConfig.db_config.coll
        ? this.mConfig.db_config.coll
        : "";
    let filter = this.mConfig.filter || {};
    if (typeof filter == "function") {
      filter = filter(this.fr, user);
    }
    let records = await this.fr.DBManager.db[coll].find(filter).then((res) => {
      return res;
    });
    // let tempRec = records.map(function (model) {
    //   return model.toObject();
    // });
    return records;
  }
}

module.exports = WorkflowHelper;
