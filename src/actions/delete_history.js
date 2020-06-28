module.exports = {
  identifier: "delete_history",
  form: {
    header: "Delete Books",
    fields: [
      {
        key: "text",
        label: "Do you want to delete ",
        type: "confirm_message"
      }
    ]
  },
  validate: async (form, db, fr, users, recordId) => {
    let bookDetail = await db.booksIssues.findOne({ _id: recordId });
    if (bookDetail.status == "issued" || bookDetail.status == "returned") {
      return {
        isValid: false,
        message:
          "Issued Book history you cannot delete, status should be requested or return accepted"
      };
    }
    return { isValid: true };
  },
  save: async (form, db, fr, users, recordId) => {
    return await db.booksIssues.removeOne({ _id: recordId });
  }
};
