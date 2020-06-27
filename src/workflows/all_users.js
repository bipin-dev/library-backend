module.exports = {
  identifier: "all_users",
  header: "User",
  // default: true,
  access: ["admin"],
  inline_action: [
    { identifier: "edit_membership", label: "Edit", icon: "plus-circle" }
  ],
  db_config: {
    coll: "users"
  },
  filter: { roles: "user" },
  display: [
    { key: "username", label: "UserName" },
    { key: "membership_days", label: "Memembership Days" },
    { key: "reading_hours", label: "Reading Hours" }
  ]
};
