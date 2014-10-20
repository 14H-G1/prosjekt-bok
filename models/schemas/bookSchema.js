module.exports = function(config, db) {

	var bookSchema = new db.Schema({
		title: {type: String, required: true},
		authors: {type: Array},
		price: {type: Number},
		isbn: {type: Number, required: true}
	});
	
	bookSchema.static('findByISBN', function(ISBNnr, callback) {
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
	bookSchema.static('findAllBooks', function(callback) {
		return this.find({}, callback);
	});
	
	return bookSchema;	
}