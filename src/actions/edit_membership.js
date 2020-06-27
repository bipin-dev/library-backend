const moment = require("moment");
const _ = require("underscore");

module.exports = {
  identifier: "edit_membership",
  require_selection: true,
  form: {
    header: "Edit Membership",
    fields: [
      {
        key: "membership_days",
        label: "Memebership days",
        type: "date"
      },
      {
        key: "reading_hours",
        label: "Reading Hours",
        type: "number"
      }
    ],
    values: async (db, fr, config, filter, user) => {
      let detail = await db.users.findOne({ _id: filter.id });
      if (detail.membership_days) {
        detail.membership_days = moment(detail.membership_days).format(
          "YYYY-MM-DD"
        );
      }
      return _.omit(detail, "password");
    }
  },
  validate: (form, db, fr, config, recordId, user) => {
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("04:00:00", timeFormat);
    let issueEnd = moment("17:00:00", timeFormat);

    if (current.isBetween(issueStart, issueEnd)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: "Book can be return between 10am to 5pm"
      };
    }
  },
  save: async (form, db, fr, config, recordId, user) => {
    console.log("form is .. ", form);
    return await db.users.updateOne({ _id: recordId }, form);
  }
};
