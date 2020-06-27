const moment = require("moment");

module.exports = {
  identifier: "book_return",
  form: {
    header: "Accept book",
    fields: [
      {
        key: "text",
        label: "Do yo want to accept book",
        type: "confirm_message"
      }
    ]
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
        message: "Book can be accepted between 10am to 5pm"
      };
    }
  },
  save: async (form, db, fr, config, recordId, user) => {
    return await db.booksIssues.updateOne(
      { _id: recordId },
      { status: "returned_accepted" }
    );
  }
};
