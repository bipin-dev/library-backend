const moment = require("moment");

module.exports = {
  identifier: "approve_request",
  form: {
    header: "Approve Book Issue Request",
    fields: [
      {
        key: "text",
        label: "Do you want to Issue Book",
        type: "confirm_message"
      }
    ]
  },
  validate: async (form, db, fr, config, recordId, user) => {
    let timeFormat = "hh:mm:ss";
    let current = moment();
    let issueStart = moment("04:30:00", timeFormat); // in utc
    let issueEnd = moment("09:30:00", timeFormat);

    if (!current.isBetween(issueStart, issueEnd)) {
      return {
        isValid: false,
        message: "Issue can happen in only between 10am to 3pm"
      };
    }
    let qty = await getBookQty(recordId, db);
    if (qty <= 0) {
      return {
        isValid: false,
        message: "Cannot Issue no books are left"
      };
    }
    return { isValid: true };
  },
  save: async (form, db, fr, config, recordId, user) => {
    let dateIssued = new Date();
    let issueDetail = await getBookIssueDetail(recordId, db);
    if (issueDetail.book_id) {
      let book = await getBookDetail(issueDetail.book_id, db);
      if (book.qty && book.qty > 0) {
        let newQty = book.qty - 1;
        await db.books.updateOne({ _id: book._id }, { qty: newQty });
      }
    }
    return await db.booksIssues.updateOne(
      { _id: recordId },
      { status: "issued", issued_date: dateIssued }
    );
  }
};

async function getBookQty(rec, db) {
  let qty = 0;
  let details = await getBookIssueDetail(rec, db);
  if (details.book_id) {
    let book = await getBookDetail(details.book_id, db);
    qty = book.qty || qty;
  }
  return qty;
}

async function getBookIssueDetail(recId, db) {
  return db.booksIssues.findOne({ _id: recId });
}

async function getBookDetail(book_id, db) {
  return db.books.findOne({ _id: book_id });
}
