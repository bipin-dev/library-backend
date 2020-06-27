const moment = require("moment");

module.exports = {
  identifier: "issue-request",
  form: {
    header: "Request for Book Issue",
    fields: [
      {
        key: "days",
        label: "Please Select Days",
        type: "select",
        values: ["1 day", "7 day"]
      },
      {
        key: "text",
        label:
          "if you select for 1 day then you have to return book today by 5pm",
        type: "confirm_message"
      }
    ]
  },
  validate: async (form, db, fr, config, recordId, user) => {
    if (user.membership_days) {
      let today = moment();
      let membershipDate = moment(user.membership_days);
      let diff = membershipDate.diff(today, "days");
      console.log("validate..... ", diff);
      if (5 >= parseInt(diff)) {
        return {
          isValid: false,
          message: "Membership is expiring before 5 days"
        };
      }
    }
    if (!form.days) {
      return {
        isValid: false,
        message: "Please select for how many days"
      };
    }
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("10:00:00", timeFormat);
    let issueEnd = moment("17:00:00", timeFormat);

    if (!current.isBetween(issueStart, issueEnd)) {
      return {
        isValid: false,
        message: "Issue can happen in only between 10am to 5pm"
      };
    }
    let bookInfo = await db.books.findOne({ _id: recordId });
    console.log("... book info ", bookInfo);
    if (!bookInfo.can_issue) {
      return {
        isValid: false,
        message: "This book can't be issued , it is only for reading purpose "
      };
    }
    return { isValid: true };
  },
  save: async (form, db, fr, config, recordId, user) => {
    console.log("form is .. ", recordId);
    console.log("user is .. ", user);
    let obj = {
      username: user.username,
      user_id: user._id.toString(),
      book_id: recordId,
      status: "requested"
    };
    if (form.days == "1 day") {
      obj.duration = 1;
    }
    if (form.days == "7 day") {
      obj.duration = 7;
    }
    return await db.booksIssues.save(obj);
  }
};
