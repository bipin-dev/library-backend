module.exports = {
  identifier: "book_admin",
  header: "Books",
  // default: true,
  access: ["admin"],
  top_action: [
    { identifier: "book-add", label: "Add Books", icon: "plus-circle" },
  ],
  inline_action: [
    { identifier: "book-edit", label: "Edit", icon: "pen" },
    { identifier: "book-delete", label: "Delete", icon: "pen" },
  ],
  db_config: {
    coll: "books",
  },
  filter: {},
  display: [
    { key: "book_name", label: "Book Name" },
    { key: "author_name", label: "Author" },
    { key: "qty", label: "Quantity" },
    { key: "edition", label: "Edition" },
    { key: "can_issue", label: "Can Issue" },
  ],
};
