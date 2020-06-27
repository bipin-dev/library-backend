const moment = require("moment");

module.exports = {
  identifier: "issue-read",
  form: {
    header: "Request for Book Reading",
    fields: [
      {
        key: "text",
        label: "Do you want get Issued this book",
        type: "confirm_message"
      }
    ]
  },
  validate: (form, db, fr, config, recordId, user) => {
    console.log("validate ", form);
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("10:00:00", timeFormat);
    let issueEnd = moment("17:00:00", timeFormat);

    if (current.isBetween(issueStart, issueEnd)) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: "Issue can happen in only between 10am to 5pm"
      };
    }
  },
  save: async (form, db, fr, config, recordId, user) => {
    let obj = {
      username: user.username,
      user_id: user._id.toString(),
      book_id: recordId,
      status: "requested",
      type: "reading"
    };
    return await db.booksIssues.save(obj);
  }
};
