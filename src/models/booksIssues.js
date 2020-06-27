module.exports = {
	collection_name: "booksIssues",
	fields: {
		username: String,
		user_id: String,
		book_id: String,
		status: String,
		duration: Number,
		issued_date: Date,
		returned_date: Date,
		type: String
	}
};
