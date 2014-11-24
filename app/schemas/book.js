var Schema = require('mongoose').Schema;

var bookSchema = new Schema({
	title: {type: String, required: true},
	year: {type: Number},
	authors: {type: Array},
	price: {type: Number},
	isbn: {type: Number},
	ean: {type: Number}
});

bookSchema.static('findISBN', function(ISBNnr, callback) {
	return this.findOne({isbn: ISBNnr}, callback);
});
bookSchema.static('findByPriceAbove', function(number, callback) {
	return this.find({price: {$gt: number}}, callback);
});
bookSchema.static('findByPriceBelow', function(number, callback) {
	return this.find({price: {$lt: number}}, callback);
});
bookSchema.static('findByPriceRange', function(min, max, callback) {
	return this.find({price: {$gt: min, $lt: max}}, callback);
});
bookSchema.static('findAll', function(callback) {
	return this.find({}, callback);
});
bookSchema.static('findTitle', function(bookTitle, callback) {
	return this.findOne({title: bookTitle}, callback);
});

module.exports = bookSchema;
