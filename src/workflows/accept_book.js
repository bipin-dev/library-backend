module.exports = {
  identifier: "accept_book",
  header: "Accept Books",
  // default: true,
  access: ["admin"],
  inline_action: [
    { identifier: "book_accepted", label: "Accept", icon: "pen" }
  ],
  db_config: {
    coll: "booksIssues"
  },
  filter: { status: "returned" },
  display: [
    { key: "username", label: "Username" },
    { key: "user_id", label: "UserID" },
    { key: "book_id", label: "BookID" },
    { key: "status", label: "Status" }
  ]
};
