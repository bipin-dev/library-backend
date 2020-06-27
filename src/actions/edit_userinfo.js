const moment = require("moment");
const _ = require("underscore");

module.exports = {
  identifier: "edit_membership",
  require_selection: true,
  form: {
    header: "Edit Membership",
    fields: [
      {
        key: "name",
        label: "Name",
        type: "input"
      },
      {
        key: "email",
        label: "Email",
        type: "input"
      },
      {
        key: "address",
        label: "Address",
        type: "input"
      },
      {
        key: "password",
        label: "Password",
        type: "input"
      }
    ],
    values: async (db, fr, config, filter, user) => {
      let detail = await db.users.findOne({ _id: filter.id });
      return detail;
    }
  },
  validate: (form, db, fr, config, recordId, user) => {
    return { isValid: true };
  },
  save: async (form, db, fr, config, recordId, user) => {
    console.log("form is .. ", form);
    return await db.users.updateOne({ _id: recordId }, form);
  }
};
