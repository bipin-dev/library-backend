const moment = require("moment");

module.exports = {
  identifier: "reject_request",
  form: {
    header: "Reject book Issue Request",
    fields: [
      {
        key: "text",
        label: "Do you want to Reject Book Issue",
        type: "confirm_message"
      }
    ]
  },
  validate: (form, db, fr, config, recordId, user) => {
    return { isValid: true };
  },
  save: async (form, db, fr, config, recordId, user) => {
    return await db.booksIssues.updateOne(
      { _id: recordId },
      { status: "rejected" }
    );
  }
};
