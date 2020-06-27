const moment = require("moment");

module.exports = {
  identifier: "issue-request",
  form: {
    header: "Request for Book Issue",
    fields: [
      {
        key: "text",
        label: "Do you want get Issued this book",
        type: "confirm_message"
      }
    ]
  },
  validate: (form, db, fr, users, recordId) => {
    console.log("validate ", form);
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("10:00:00", format);
    let issueEnd = moment("17:00:00", format);

    if (current.isBetween(issueStart, issueEnd)) {
      console.log("is between");
      return { isValid: true, message: "dfdsffsdf" };
    } else {
      console.log("is not between");
      return {
        isValid: false,
        message: "Issue can happen in only between 10am to 5pm"
      };
    }
  },
  save: async (form, db, fr, users, recordId) => {
    console.log("save ", form);
    form.can_issue = form.can_issue && form.can_issue == "Yes" ? true : false;
    return await db.books.save(form);
  }
};
