module.exports = {
  collection_name: "users",
  fields: {
    username: String,
    password: String,
    membership_days: Date,
    reading_hours: Number,
    requested_books: Array,
    issued_books: Array,
    returned_books: Array,
    name: String,
    email: String,
    address: String,
    type: String
  }
};
