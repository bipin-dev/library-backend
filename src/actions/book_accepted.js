const moment = require("moment");

module.exports = {
  identifier: "book_accepted",
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
    let issueStart = moment("10:00:00", timeFormat);
    let issueEnd = moment("17:00:00", timeFormat);

    if (!current.isBetween(issueStart, issueEnd)) {
      return {
        isValid: false,
        message: "Book can be accepted between 10am to 5pm"
      };
    }
    return { isValid: true };
  },
  save: async (form, db, fr, config, recordId, user) => {
    let returned_date = new Date();
    await updateBookQty(recordId, db);
    return await db.booksIssues.updateOne(
      { _id: recordId },
      { status: "returned_accepted", returned_date: returned_date }
    );
  }
};

async function updateBookQty(rec, db) {
  let qty = 0;
  let details = await getBookIssueDetail(rec, db);
  if (details.book_id) {
    return db.books.updateOne({ _id: details.book_id }, { $inc: { qty: 1 } });
  }
  return;
}

async function getBookIssueDetail(recId, db) {
  return db.booksIssues.findOne({ _id: recId });
}
