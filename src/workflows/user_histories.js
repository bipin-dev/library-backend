module.exports = {
  identifier: "user_histories",
  header: "Books",
  // default: true,
  access: ["user"],
  inline_action: [
    { identifier: "delete_history", label: "Delete", icon: "pen" }
  ],
  db_config: {
    coll: "booksIssues"
  },
  filter: {},
  display: [
    { key: "username", label: "Username" },
    { key: "book_name", label: "Book Name" },
    { key: "author_name", label: "Author Name" },
    { key: "edition", label: "Edition" },
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
