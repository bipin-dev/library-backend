module.exports = {
  identifier: "admin_requests",
  header: "Request for Issue Books",
  // default: true,
  access: ["admin"],
  inline_action: [
    { identifier: "approve_request", label: "Approve", icon: "pen" },
    { identifier: "reject_request", label: "Reject", icon: "pen" }
  ],
  db_config: {
    coll: "booksIssues"
  },
  filter: { status: "requested" },
  display: [
    { key: "username", label: "Username" },
    { key: "book_name", label: "Book Name" },
    { key: "author_name", label: "Author Name" },
    { key: "edition", label: "Edition" },
    { key: "type", label: "Type of Issue" },
    { key: "duration", label: "Days" },
    { key: "status", label: "Status" }
  ],
  formatter: async (items, fr, user) => {
    for (let item of items) {
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
