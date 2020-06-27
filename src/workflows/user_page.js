const moment = require("moment");

module.exports = {
  identifier: "user_page",
  header: "User Managment",
  // default: true,
  access: ["user"],
  inline_action: [
    { identifier: "edit_userinfo", label: "Edit Info", icon: "plus-circle" }
  ],
  db_config: {
    coll: "users"
  },
  filter: (fr, user) => {
    return { _id: user._id, roles: "user" };
  },
  display: [
    { key: "username", label: "UserName" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "password", label: "Password" },
    { key: "membership_days", label: "Membership days" },
    { key: "left_days", label: "Membership Expire In" },
    { key: "reading_hours", label: "Reading Hours" }
  ],
  formatter: (items, fr, user) => {
    return items.map((as) => {
      as.left_days = getLeftDays(as.membership_days);
      return as;
    });
  }
};

function getLeftDays(memDate) {
  let today = moment();
  let membershipDate = moment(memDate);
  let diff = membershipDate.diff(today, "days");
  console.log("get left days ", diff);
  if (parseInt(diff) < 0) {
    return "expired";
  }
  return diff + " days";
}
