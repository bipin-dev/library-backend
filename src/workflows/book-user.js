module.exports = {
  identifier: "book_user",
  header: "Books",
  access: ["user"],
  inline_action: [
    // put validation so that admin and user can't reachout
    { identifier: "issue-request", label: "Request for Issue", icon: "pen" },
    { identifier: "issue-read", label: "Request for Reading", icon: "pen" }
  ],
  db_config: {
    coll: "books"
  },
  filter: {},
  searchEnabled: true,
  searchField: "book_name",
  display: [
    { key: "book_name", label: "Book Name" },
    { key: "author_name", label: "Author" },
    { key: "qty", label: "Quantity" },
    { key: "edition", label: "Edition" },
    { key: "can_issue", label: "Can Issue" }
  ]
};
