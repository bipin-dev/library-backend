const moment = require("moment");

module.exports = {
  identifier: "issued_books",
  header: "Books",
  // default: true,
  access: ["user"],
  inline_action: [{ identifier: "book_return", label: "Return", icon: "pen" }],
  db_config: {
    coll: "booksIssues"
  },
  filter: { status: "issued" }, // user in this id also
  display: [
    { key: "username", label: "Username" },
    { key: "book_name", label: "Book Name" },
    { key: "author_name", label: "Author Name" },
    { key: "edition", label: "Edition" },
    { key: "duration", label: "Days" },
    { key: "issued_date", label: "Issued Date" },
    { key: "status", label: "Status" }
  ],
  formatter: async (items, fr, user) => {
    for (let item of items) {
      if (item.issued_date) {
        item.issued_date = moment(item.issued_date).format("MM/DD/YYYY");
      }
      if (item.book_id) {
        let bookInfo = await getBookInfo(item.book_id, fr);
        // console.log("book info ", bookInfo);
        item.book_name = bookInfo.book_name;
        item.author_name = bookInfo.author_name;
        item.edition = bookInfo.edition;
      }
    }
    return items;
  }
};

async function getBookInfo(bookId, fr) {
  return fr.DBManager.db.books.findOne({ _id: bookId });
}
