const moment = require("moment");

module.exports = {
  identifier: "book_return",
  form: {
    header: "Return book",
    fields: [
      {
        key: "text",
        label: "Are you sure want to return",
        type: "confirm_message"
      }
    ]
  },
  validate: (form, db, fr, config, recordId, user) => {
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("04:30:00", timeFormat); // in utc
    let issueEnd = moment("11:30:00", timeFormat);

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
    return await db.booksIssues.updateOne(
      { _id: recordId },
      { status: "returned" }
    );
  }
};
