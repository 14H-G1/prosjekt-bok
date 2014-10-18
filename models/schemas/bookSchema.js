
module.exports = function(config, db) {

	var bookSchema = new db.Schema({
		title: {type: String, required: true},
		authors: {type: Array},
		price: {type: Number},
		isbn: {type: Number, required: true}
	});
	
	bookSchema.statics.findByISBN = function(ISBNnr, callback) {
		return this.find({isbn: ISBNnr}, callback);
	};
	
	bookSchema.statics.findAllBooks = function(callback) {
		return this.find({}, callback);
	};
	
	return bookSchema;	
}