module.exports = {
  identifier: "book-edit",
  require_selection: true,
  form: {
    header: "Edit Books",
    fields: [
      {
        key: "book_name",
        label: "Book Name",
        type: "input"
      },
      {
        key: "author_name",
        label: "Author Name",
        type: "input"
      },
      {
        key: "edition",
        label: "Edition",
        type: "input"
      },
      {
        key: "qty",
        label: "Quantity",
        type: "number"
      },
      {
        key: "can_issue",
        label: "Avialable For Issue",
        type: "select",
        values: ["Yes", "No"]
      }
    ],
    values: async (db, fr, config, filter, user) => {
      console.log("book edit ....", filter);
      let book = await db.books.findOne({ _id: filter.id });
      book.can_issue = book.can_issue ? "Yes" : "No";
      return book;
    }
  },
  validate: (form, db, fr, users) => {
    console.log("validate ", form);
    return { isValid: true, message: "dfdsffsdf" };
  },
  save: async (form, db, fr, config, recordId, user) => {
    console.log("save ", form);
    form.can_issue = form.can_issue && form.can_issue == "Yes" ? true : false;
    if (form._id) {
      delete form._id;
    }
    return await db.books.updateOne({ _id: recordId }, form);
  }
};
