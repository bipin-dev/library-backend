module.exports = {
  identifier: "book-delete",
  form: {
    header: "Delete Books",
    fields: [
      {
        key: "text",
        label: "Do you want to delete",
        type: "confirm_message"
      }
    ]
  },
  validate: (form, db, fr, users, recordId) => {
    console.log("validate ", form);
    return { isValid: true, message: "dfdsffsdf" };
  },
  save: async (form, db, fr, users, recordId) => {
    return await db.books.removeOne({ _id: recordId });
  }
};
