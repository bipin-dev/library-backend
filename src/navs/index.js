module.exports = [
  {
    label: "All Books",
    link: "/wrk/book_admin",
    type: "workflow",
    access: ["admin"]
  },
  {
    label: "Issue Requests",
    link: "/wrk/admin_requests",
    type: "workflow",
    access: ["admin"]
  },
  {
    label: "Accept Book",
    link: "/wrk/accept_book",
    type: "workflow",
    access: ["admin"]
  },
  {
    label: "All Users", //add code to block user to access workflow
    link: "/wrk/all_users",
    type: "workflow",
    access: ["admin"]
  },
  {
    label: "Books",
    link: "/wrk/book_user",
    type: "workflow",
    access: ["user"]
  },
  {
    label: "Issued Books",
    link: "/wrk/issued_books",
    type: "workflow",
    access: ["user"]
  },
  {
    label: "User Info",
    link: "/wrk/user_page",
    type: "workflow",
    access: ["user"]
  },
  {
    label: "History",
    link: "/wrk/user_histories",
    type: "workflow",
    access: ["user"]
  }
  //   {
  //     label: "Inventory",
  //     link: "/wrk/inventory",
  //   },
];
