module.exports = {
  identifier: "book-add",
  form: {
    header: "Add Books",
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
    ]
  },
  validate: (form, db, fr, users) => {
    console.log("validate ", form);
    return { isValid: true, message: "dfdsffsdf" };
  },
  save: async (form, db, fr, users) => {
    console.log("save ", form);
    form.can_issue = form.can_issue && form.can_issue == "Yes" ? true : false;
    return await db.books.save(form);
  }
};
